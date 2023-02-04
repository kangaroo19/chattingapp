import {Link} from "react-router-dom"
function Navigation({userObj}){
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">유저목록</Link>
                </li>
                <li>
                    <Link to="/roomlist">채팅방</Link>
                </li>
                <li>
                    <Link to="/profile">{userObj.displayName} 의 프로필</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navigation