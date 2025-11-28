export const TAG_COLORS = ["green", "blue", "pink", "purple", "yellow"] as const;
export type TagColorKey = typeof TAG_COLORS[number];


export interface Tag {
  label: string;
  color: TagColorKey;
}

export interface TagChipProps {
  label: string;
  colorKey: TagColorKey;
}
