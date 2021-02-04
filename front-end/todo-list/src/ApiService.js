import axios from 'axios';

const MEMBER_API_BASE_URL="http://localhost:8080/users";

class ApiService{
    insertMember(member){
        return axios.post(MEMBER_API_BASE_URL,member);
    }
}
export default new ApiService();