import { useState } from 'react'
import './DashBoard.css'

function DashBoard() {
  const [isNightMode, setIsNightMode] = useState(false)
  const [isSoundOn, setIsSoundOn] = useState(true)
  const [activeScene, setActiveScene] = useState('')
  const videoPath = import.meta.env.BASE_URL

  function playVideo(event) {
    const activeVideo = event.currentTarget.querySelector('video')

    document.querySelectorAll('.split-video').forEach((video) => {
      if (video !== activeVideo) {
        video.pause()
      }

      video.muted = video !== activeVideo
    })

    activeVideo.volume = 0.8
    activeVideo.muted = !isSoundOn
    activeVideo.play().catch(() => {
      activeVideo.muted = true
      activeVideo.play().catch(() => {})
    })
  }

  function pauseVideo(event) {
    const activeVideo = event.currentTarget.querySelector('video')

    activeVideo.pause()
    activeVideo.muted = true
  }

  function toggleSound() {
    const nextSoundMode = !isSoundOn

    setIsSoundOn(nextSoundMode)

    if (!nextSoundMode) {
      document.querySelectorAll('.split-video').forEach((video) => {
        video.muted = true
      })
    }
  }

  function showScene(event, scene) {
    event.preventDefault()
    const nextScene = activeScene === scene ? '' : scene

    setActiveScene(nextScene)

    document.querySelectorAll('.split-video').forEach((video) => {
      video.pause()
      video.muted = true
    })

    if (!nextScene) {
      return
    }

    const activeVideo = document.querySelector(`.split-video-${nextScene}`)

    activeVideo.volume = 0.8
    activeVideo.muted = !isSoundOn
    activeVideo.play().catch(() => {
      activeVideo.muted = true
      activeVideo.play().catch(() => {})
    })
  }

  function showSplit(event) {
    event.preventDefault()
    setActiveScene('')

    document.querySelectorAll('.split-video').forEach((video) => {
      video.pause()
      video.muted = true
    })
  }

  return (
    <main className={`page ${isNightMode ? 'page-night' : ''}`}>
      <section
        className={`video-split ${activeScene ? `${activeScene}-full` : ''}`}
        aria-label="Day and night video split"
      >
        <aside className="sidebar" aria-label="Site navigation">
          <a className="sidebar-logo" href="/" aria-label="Day and Night home">
            D/N
          </a>
          <button
            className="theme-toggle"
            type="button"
            aria-label="Toggle brightness mode"
            aria-pressed={isNightMode}
            onClick={() => setIsNightMode((currentMode) => !currentMode)}
          >
            {isNightMode ? 'Night' : 'Day'}
          </button>
          <button
            className="sound-toggle"
            type="button"
            aria-label="Toggle video sound"
            aria-pressed={isSoundOn}
            onClick={toggleSound}
          >
            {isSoundOn ? 'Sound On' : 'Sound Off'}
          </button>
          <nav className="sidebar-nav">
            <a className="sidebar-link" href="#day-night" onClick={showSplit}>
              D&N
            </a>
            <a
              className="sidebar-link"
              href="#day"
              onClick={(event) => showScene(event, 'day')}
            >
              Day
            </a>
            <a
              className="sidebar-link"
              href="#night"
              onClick={(event) => showScene(event, 'night')}
            >
              Night
            </a>
          </nav>
        </aside>
        <h1 className="site-title">{activeScene || 'day & night'}</h1>
        <div
          className="split-panel split-panel-day"
          onPointerEnter={playVideo}
          onPointerLeave={pauseVideo}
        >
          <video
            className="split-video split-video-day"
            src={`${videoPath}videos/day.mp4`}
            loop
            muted
            playsInline
            preload="auto"
          />
        </div>
        <div
          className="split-panel split-panel-night"
          onPointerEnter={playVideo}
          onPointerLeave={pauseVideo}
        >
          <video
            className="split-video split-video-night"
            src={`${videoPath}videos/night.mp4`}
            loop
            muted
            playsInline
            preload="auto"
          />
        </div>
      </section>
    </main>
  )
}

export default DashBoard
