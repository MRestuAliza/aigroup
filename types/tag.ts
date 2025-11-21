export type TagColorKey = "green" | "blue" | "pink" | "purple" | "yellow";

export interface Tag {
  label: string;
  color: TagColorKey;
}

export interface TagChipProps {
  label: string;
  colorKey: TagColorKey;
}
