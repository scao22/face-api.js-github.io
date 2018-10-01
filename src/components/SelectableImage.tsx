import * as Mui from '@material-ui/core';
import * as React from 'react';
import styled from 'styled-components';

import { ImageWrap } from '../ImageWrap';
import { SideBySide } from '../styled/SideBySide';
import { ImageSelection, ImageSelectionItem } from './ImageSelection';
import { ImageWithOverlay } from './ImageWithOverlay';

const Container = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Margin = styled.div`
  margin: 10px;
`


export enum SelectionTypes {
  SELECT = 'SELECT',
  FILE = 'FILE',
  BOTH = 'BOTH'
}

export type SelectableImageProps = {
  onLoaded: (refs: { img: ImageWrap, overlay: HTMLCanvasElement}) => any
  items?: ImageSelectionItem[]
  initialImageSrc?: string
  maxImageWidth?: number
  selectionType?: SelectionTypes
}

export type SelectableImageState = {
  imageSrc: string
}

export class SelectableImage extends React.Component<SelectableImageProps, SelectableImageState> {
  static defaultProps: Partial<SelectableImageProps> = {
    maxImageWidth: 800,
    selectionType: SelectionTypes.SELECT
  }

  constructor(props: SelectableImageProps) {
    super(props)

    this.state = {
      imageSrc: props.initialImageSrc
    }

    this.onChangeSelection = this.onChangeSelection.bind(this)
    this.onLoadFromDisk = this.onLoadFromDisk.bind(this)
  }

  onChangeSelection(imageSrc: string) {
    this.setState({
      imageSrc
    })
  }

  onLoadFromDisk(e: any) {
    const file = (e.target.files || [])[0]
    if (!file) {
      return
    }

    const reader = new FileReader()

    reader.onload = (loadEvent: any) =>
    this.setState({
      imageSrc: loadEvent.target.result
    })

    reader.readAsDataURL(e.target.files[0])
  }

  render() {
    const { selectionType } = this.props
    return (
      <Container>
        <ImageWithOverlay
          {...this.props}
          imageSrc={this.state.imageSrc}
        />
        <SideBySide>
        {
          (selectionType === SelectionTypes.SELECT || selectionType === SelectionTypes.BOTH)
            &&
            <Margin>
              <ImageSelection
                items={this.props.items}
                selectedImage={this.state.imageSrc}
                onChange={this.onChangeSelection}
              />
            </Margin>
        }
        {
          (selectionType === SelectionTypes.FILE || selectionType === SelectionTypes.BOTH)
            &&
            <Margin>
              <input
                accept="image/*"
                id="raised-button-file"
                multiple
                style={{ display: 'none' }}
                onChange={this.onLoadFromDisk}
                type="file"
              />
              <label htmlFor="raised-button-file">
                <Mui.Button variant="outlined" component="span">
                  From Disk
                </Mui.Button>
              </label>
            </Margin>
        }
        </SideBySide>
      </Container>
    )
  }
}