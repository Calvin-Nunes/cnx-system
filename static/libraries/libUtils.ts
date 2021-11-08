const LibUtils = {
  toDecimal(value: any): Number {
    if (typeof value === 'number' || typeof value === 'bigint') {
      return value as Number
    } else if (typeof value === 'string') {
      let n = Number(value)
      if (!isNaN(n)) {
        return n
      }
    } else if (typeof value === 'boolean') {
      return value ? 1 : 0
    }

    return 0
  },

  toBoolean(value: any): boolean {
    if (typeof value === 'boolean') {
      return value as boolean;
    } else if (typeof value === 'number') {
      return value >= 1 ? true : false;
    } else if (typeof value === 'string') {
      let vStr = value.toString().toLowerCase()
      return vStr === 'y' || vStr === 'yes' || vStr === 'true';
    }
    return false;
  },

  isEmpty(value:any):boolean{
      if (value == null){
          return true;
      }

      if (typeof value === 'string'){
        if (value.trim().length == 0){
            return true
        }
      }

      if (typeof value === 'number'){
          return value === 0
      }

      if (value instanceof Array){
          return value.length == 0;
      }
      else if (typeof value === 'object'){
        return Object.keys(value).length == 0;
      }

      return false;
  },

  isValidEmail(email:string):boolean{
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(email).toLowerCase());
  }
}

export default LibUtils
