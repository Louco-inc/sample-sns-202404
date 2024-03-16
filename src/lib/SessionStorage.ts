/**
 * uuidの格納
 * @param {string} uuid
 */
export const saveUUIDToSessionStorage = (uuid: string): void => {
  sessionStorage.setItem("sample-sns-app-uuid", uuid);
}

/**
 * uuidの取得
 * @return {*}  {(string | null)}
 */
export const getUUIDFromSessionStorage = (): string | null => {
  return sessionStorage.getItem("sample-sns-app-uuid");
}
