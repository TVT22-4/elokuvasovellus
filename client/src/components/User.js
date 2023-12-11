import { jwtToken, userInfo } from "./Signals";


export default function PersonalData(){
    return (
        <div>
            {userInfo.value === null ? <h2>No authorized personal data</h2>:
                <div>
                    <h2>{userInfo.value.personalData}</h2>
                    <button onClick={()=> jwtToken.value = ''}>Logout</button>
                </div> 
            }
        </div>
    )
}