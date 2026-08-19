export function workAsset(path: string): string {
  return encodeURI(path);
}

export function workAssetByPath(workPath: string, relative: string): string {
  return encodeURI(`${workPath}/${relative}`);
}

export const workDirPath = (owner: string, project?: string) =>
  `/works/${owner}${project ? `/${project}` : ""}`;