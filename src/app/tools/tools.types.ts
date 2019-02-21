export interface Result<T> {

  entity: T;
  success: boolean;
  errors?: Array<string>;

}
