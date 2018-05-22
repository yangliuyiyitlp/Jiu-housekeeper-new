let formatDates = time => {  
    if(time){  
    	return new Date(parseInt(time)).toJSON().slice(0,10)
//      return time.slice(5,16)  
    }  
}
let formatMobile = value => {
	if(value) {
		return value.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
	}
}
//
export { formatDates,formatMobile }  