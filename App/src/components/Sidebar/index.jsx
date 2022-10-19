import {SidebarContainer, Icon, CloseIcon, SidebarWrapper, SidebarMenu, SidebarLink, SideBtnWrap, SidebarRoute} from './SidebarElements'
import { useNavigate } from "react-router-dom";
import {useMoralis} from 'react-moralis'
function Sidebar({isOpen, toggle}) {
    let navigate= useNavigate();
    const {isAuthenticated, logout}=useMoralis();
    const ButtonLogout = ()=>{
        if(isAuthenticated){
          return <div><SidebarRoute to="/" onClick={()=>logout()}> Logout </SidebarRoute></div>
        }
    }
    return (
    <SidebarContainer isOpen={isOpen}>
        <Icon onClick={toggle}>
            <CloseIcon/>
        </Icon>
        <SidebarWrapper>
            <SidebarMenu>
            <SidebarLink to="/candidates"  onClick={toggle}>
            <div onClick={()=>navigate('../candidates')}>Candidates</div>
                </SidebarLink>
                <SidebarLink to="/tests" onClick={toggle}>
                <div onClick={()=>navigate('../tests')}>Tests</div>
                </SidebarLink>
                <SidebarLink to="/settings" onClick={toggle}>
                <div onClick={()=>navigate('../settings')}>    Settings</div>
                </SidebarLink>
            </SidebarMenu>
            <SideBtnWrap>
                <ButtonLogout/>
            </SideBtnWrap>

        </SidebarWrapper>
    </SidebarContainer>
  );
}

export default Sidebar;