import * as faceapi from 'face-api.js';
import * as React from 'react';

import { ModalLoader } from '../components/ModalLoader';

export interface InjectedProps {
  faceDetectionNet?: faceapi.FaceDetectionNet
  faceLandmarkNet?: faceapi.FaceLandmarkNet
  faceRecognitionNet?: faceapi.FaceRecognitionNet
  mtcnnModelUrl?: faceapi.Mtcnn
}

export interface LoadModelsProps {
  faceDetectionModelUrl?: string
  faceLandmarkModelUrl?: string
  faceRecognitionModelUrl?: string
  mtcnnModelUrl?: string
  children: (props: InjectedProps) => React.Component | JSX.Element
}

export interface LoadModelsState {
  nets: InjectedProps
  isLoading: boolean
}

export class LoadModels extends React.Component<LoadModelsProps, LoadModelsState> {

    state: LoadModelsState = {
      nets: {},
      isLoading: true
    }

    async loadModels() {
      const {
        faceDetectionModelUrl,
        faceLandmarkModelUrl,
        faceRecognitionModelUrl,
        mtcnnModelUrl
      } = this.props

      const loadOrUndefined = async (net: any, url?: string) => {
        if (!url) {
          return undefined
        }
        await net.load(url)
        return net
      }

      const promises = [
        loadOrUndefined(faceapi.nets.ssdMobilenet, faceDetectionModelUrl),
        loadOrUndefined(faceapi.nets.faceLandmark68Net, faceLandmarkModelUrl),
        loadOrUndefined(faceapi.nets.faceRecognitionNet, faceRecognitionModelUrl),
        loadOrUndefined(faceapi.nets.mtcnn, mtcnnModelUrl)
      ]

      const [faceDetectionNet, faceLandmarkNet, faceRecognitionNet] = await Promise.all(promises)

      this.setState({
        isLoading: false,
        nets: {
          faceDetectionNet,
          faceLandmarkNet,
          faceRecognitionNet
        }
      })
    }

    componentDidMount() {
      this.loadModels()
    }

    render() {
      if (this.state.isLoading) {
        return <ModalLoader title="Loading Models" />
      }

      return this.props.children(this.state.nets)
    }
  }
