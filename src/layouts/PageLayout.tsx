import { IconButton } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import * as React from 'react';

import { SideMenu } from '../components/SideMenu';
import { CenterContent } from '../components/styled/CenterContent';

const MENU_ITEMS = [
  { label: 'Image Face Classification', linkTo: '/image_face_classification' },
  { label: 'Image Face Recognition', linkTo: '/image_face_recognition' },
  { label: 'Video Face Classification', linkTo: '/video_face_classification' },
  { label: 'Video Face Recognition', linkTo: '/video_face_recognition' },
  { label: 'Webcam Face Classification', linkTo: '/webcam_face_classification' },
  { label: 'Webcam Face Recognition', linkTo: '/webcam_face_recognition' },
]

const styles = (theme: any) => ({
  pageContent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    maxWidth: '800px',
    padding: '10px',
    marginLeft: '0px',
    [theme.breakpoints.up('md')]: {
      marginLeft: theme.sideMenuWidth
    }
  }
})

type PageLayoutProps = {
  classes: any
}

type PageLayoutState = {
  isSideMenuOpen: boolean
}

class PageLayoutComponent extends React.Component<PageLayoutProps, PageLayoutState> {
  state: PageLayoutState = {
    isSideMenuOpen: false
  }

  toggleMenu = () => {
    this.setState(state => ({ isSideMenuOpen: !state.isSideMenuOpen }))
  }

  public render() {
    return (
      <div>
        <IconButton
          aria-label="open drawer"
          onClick={this.toggleMenu}
          style={{ zIndex: 999 }}
        >
          <MenuIcon />
        </IconButton>
        <SideMenu
          items={MENU_ITEMS}
          isOpen={this.state.isSideMenuOpen}
          onToggle={this.toggleMenu}
        />
        <div className={this.props.classes.pageContent}>
          <CenterContent>
            { this.props.children }
          </CenterContent>
        </div>
      </div>
    )
  }

}

export const PageLayout = withStyles(styles as any)(PageLayoutComponent)