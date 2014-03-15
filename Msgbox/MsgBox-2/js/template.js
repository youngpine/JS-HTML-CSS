/**
 * Created by cgs on 14-3-15.
 * Email:cgspine@gmail.com
 */
 //调用浏览器判断
base.agent(function(e){
    switch(e){
        case 1://IE
            alert('IE');//coding
            break;
        case 2://firefox
            alert('firefox');//coding
            break;
        case 3://chrome
            alert('chrome');//coding
            break;
        case 4://opera
            alert('opera');//coding
            break;
        case 5://safari
            alert('safari');//coding
            break;
        default:
            alert('I can\'t know your browser');//coding
            break;
    }
})