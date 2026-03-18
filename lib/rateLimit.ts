import { NextRequest, NextResponse } from "next/server";

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

const rateLimitStore: RateLimitStore = {};

/**
 * Rate Limiter untuk proteksi dari brute force attacks
 * @param identifier - Unique identifier (bisa IP address atau user ID)
 * @param limit - Jumlah request yang diizinkan
 * @param windowMs - Time window dalam milliseconds (default: 1 menit)
 * @returns boolean - true jika request diizinkan, false jika rate limited
 */
export function checkRateLimit(
  identifier: string,
  limit: number = 100,
  windowMs: number = 60000
): boolean {
  const now = Date.now();
  const key = identifier;

  // Jika belum ada record, buat yang baru
  if (!rateLimitStore[key]) {
    rateLimitStore[key] = {
      count: 1,
      resetTime: now + windowMs,
    };
    return true;
  }

  const record = rateLimitStore[key];

  // Jika window sudah reset
  if (now >= record.resetTime) {
    record.count = 1;
    record.resetTime = now + windowMs;
    return true;
  }

  // Jika masih dalam window
  record.count++;
  return record.count <= limit;
}

/**
 * Get remaining requests untuk user
 */
export function getRateLimitRemaining(identifier: string, limit: number = 100): number {
  const record = rateLimitStore[identifier];
  if (!record) return limit;
  return Math.max(0, limit - record.count);
}

/**
 * Middleware untuk rate limiting
 */
export async function rateLimitMiddleware(
  req: NextRequest,
  limit: number = 100,
  windowMs: number = 60000
): Promise<{ allowed: boolean; response?: NextResponse }> {
  // Ambil IP dari request
  const ip =
    req.headers.get("x-forwarded-for") ||
    req.headers.get("x-real-ip") ||
    "unknown";

  const allowed = checkRateLimit(ip, limit, windowMs);
  const remaining = getRateLimitRemaining(ip, limit);

  if (!allowed) {
    return {
      allowed: false,
      response: NextResponse.json(
        {
          status: "error",
          message: "Too many requests. Please try again later.",
        },
        { 
          status: 429,
          headers: {
            "Retry-After": "60",
            "X-RateLimit-Limit": limit.toString(),
            "X-RateLimit-Remaining": remaining.toString(),
          }
        }
      ),
    };
  }

  return { allowed: true };
}

/**
 * Clean up old entries setiap 5 menit
 */
export function cleanupRateLimitStore(): void {
  const now = Date.now();
  Object.keys(rateLimitStore).forEach((key) => {
    if (now >= rateLimitStore[key].resetTime) {
      delete rateLimitStore[key];
    }
  });
}

// Run cleanup setiap 5 menit
if (typeof global !== "undefined") {
  setInterval(cleanupRateLimitStore, 5 * 60 * 1000);
}
