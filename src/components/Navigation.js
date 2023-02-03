import {Link} from "react-router-dom"
function Navigation(){
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">유저목록</Link>
                </li>
                <li>
                    <Link to="/room">채팅방</Link>
                </li>
                <li>
                    <Link to="profile">내 프로필</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navigation