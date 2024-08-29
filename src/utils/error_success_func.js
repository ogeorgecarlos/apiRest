export function error(message){
    return {errors:[`${message}`]};
  }

export function success(message){
    return {success:[`${message}`]};
  }