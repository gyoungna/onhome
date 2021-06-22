import axios from 'axios';

//spring으로의 url mapping.(rest api를 따름..login은 예외...?)
const MEMBER_API_BASE_URL="http://localhost:8080/users";

class ApiService{
    insertUser(user){
        return axios.post(MEMBER_API_BASE_URL,user);
    }
    login(user){
        return axios.post("http://localhost:8080/authenticate",user);
    }
    loadAuth(auth){
        return axios.get(MEMBER_API_BASE_URL+'/auth/'+auth);
    }
    deleteUser(id){
        return axios.delete(MEMBER_API_BASE_URL+'/'+id);
    }
    updateUser(user){
        return axios.put(MEMBER_API_BASE_URL+'/'+user.id,user);
    }
    loadUser(id){
        return axios.get(MEMBER_API_BASE_URL+'/'+id);
    }
}
export default new ApiService();