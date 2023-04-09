// helper function which determines how long ago a post was made depending on 
//current time and updated time
module.exports = {
    formatTime: (date) => {
        const now = new Date();
        const seconds = now.getSeconds() - date.getSeconds();
        const minutes = now.getMinutes() - date.getMinutes();
        const hours = now.getHours() - date.getHours();
        const days = now.getDay() - date.getDay();
        const months = now.getMonth() - date.getMonth();
        const years = now.getYear() - date.getYear(); 

        if(years > 0){
            if(years > 1){
                return `${years} years ago`
            }
            return `${years} year ago`
        }else if(months > 1){
            if(months > 1){
                return `${months} months ago`
            }
            return `${months} month ago`
        }else if(days > 0){
            if(days === 1){
                return "yesterday"
            }else{
                switch(date.getDay()){
                    case 0:
                        return `Sunday`
                        break;
                    case 1:
                        return `Monday`
                        break;
                    case 2:
                         return `Tuesday`
                        break;
                    case 3:
                        return `Wednesday`
                        break;
                    case 4:
                        return `Thursday`
                        break;
                    case 5:
                        return `Friday`
                        break;
                    case 6:
                        return `Saturday`
                        break;
                }
            }
        }else if(hours > 0){
            if(hours  > 1){
                return `${hours} hours ago`
            }
            return `${hours} hour ago`
        }else if(minutes > 0){
            if(minutes > 1){
                return `${minutes} minutes ago`
            }
            return `${minutes} minute ago`
        }else if(seconds >= 0){
            if(seconds > 30){
                return `30 seconds ago`
            }
            return `seconds ago`
        }
    },

}