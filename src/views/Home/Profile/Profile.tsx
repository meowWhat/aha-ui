import Webcam from 'react-webcam'

export default function Profile() {
  return (
    <div className="profile">
      <Webcam
        videoConstraints={{
          width: 1280,
          height: 720,
          facingMode: { exact: 'environment' },
        }}
      />
    </div>
  )
}
