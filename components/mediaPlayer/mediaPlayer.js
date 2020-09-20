import PlayerControls from './playerControls/playerControls'
import styles from './mediaPlayer.module.css'

class MediaPlayer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            paused: true,
            muted: false,
            length: null,
            formattedLength: null,
            currentTime: 0,
            formattedTime: null,
            volume: 0.5
        };
    }

    
    play = () => {
        this.duration();
        const player = document.querySelector(".player");
        const playPauseBtn = document.querySelector('#play-pause__button');

        this.setState({
            paused: !this.state.paused
        });

        if(this.state.paused)
        {
            player.play();
            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
            this.setState({
                paused: false
            });
        }
        else
        {
            player.pause();
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
            this.setState({
                paused: true
            });
        }
    }

    duration = () => {
        const player = document.querySelector('.player');
        let dur = player.duration;
        dur = dur.toFixed();
        let formattedLength = dur.toHHMMSS();

        this.setState({
            length: dur,
            formattedLength: formattedLength
        });

        return dur;
    }

    currentTime = () => {
        const playBtn = document.querySelector('#play-pause__button');
        let cur = document.querySelector('.player').currentTime;
        cur = cur.toFixed();
        let formattedTime = cur.toHHMMSS();

        this.setState({
            currentTime: cur,
            formattedTime: formattedTime
        });

        if(parseInt(this.state.currentTime) === parseInt(this.state.length))
        {
            this.setState({
                paused: true
            });

            playBtn.innerHTML = '<i class="fas fa-play"></i>';
        }

        return cur;
    }

    customTime = () => {
        const timeRange = document.querySelector('.timeRange');
        document.querySelector('.player').currentTime = timeRange.value;

        this.setState({
            currentTime: timeRange.value
        });
    }

    customVolume = () => {
        const volumeRange = document.querySelector('.volumeRange');
        const vol = volumeRange.value;
        document.querySelector('.player').volume = vol;

        this.setState({
            value: vol
        });

        if(vol == 0)
        {
            this.setState({
                muted: true
            });
        }
        else
        {
            this.setState({
                muted: false
            });
        }
    }

    mute = () => {
        const player = document.querySelector('.player');
        const muteBtn = document.querySelector('#mute__button');
        player.muted = true;

        this.setState({
            muted: true
        });

        const muted = this.state.muted;

        if(muted)
        {
            player.muted = false;

            this.setState({
                muted: false
            });

            muteBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
        }
        else
        {
            player.muted = true;

            this.setState({
                muted: true
            });

            muteBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
        }
    }

    componentDidMount = () => {
        this.customVolume();
        setInterval(() => this.setState({ currentTime: this.currentTime() }), 10);
        setInterval(() => this.setState({ length: this.duration() }), 10);
    }

    render() {
        String.prototype.toHHMMSS = function() {
            let secNum = parseInt(this, 10);
            let hours = Math.floor(secNum / 3600);
            let min = Math.floor((secNum - hours * 3600) / 60);
            let sec = secNum - hours * 3600 - min * 60;
    
            if(hours < 10) {
                hours = "0" + hours;
            }
    
            if(min < 10) {
                min = "0" + min;
            }
    
            if(sec < 10) {
                sec = "0" + sec;
            }
    
            return `${hours}:${min}:${sec}`;
        };

        const {poster, id, type} = this.props;

        if(type == 'music')
        {
            return (
                <div className={[styles.MediaPlayer, styles.musicPalyer ].join(' ')}>
                    <img src={`/${poster}`} />
                    <audio className="player">
                        <source src={`/play/${id}`} />
                    </audio>
                    <PlayerControls 
                        type="music"
                        play={this.play}
                        mute={this.mute}
                        timeChange={this.customTime}
                        timeValue={this.state.currentTime}
                        mediaLength={this.state.length}
                        volChange={this.customVolume}
                        time={this.state.formattedTime}
                        length={this.state.formattedLength}
                    />
                </div>
            )
        }
        else
        {
            return (
                <div className={styles.MediaPlayer}>
                    <video className={`player ${styles.videoPlayer}`} poster={`/${poster}`}>
                        <source src={`/play/${id}`} />
                    </video>
                    <PlayerControls 
                        type="video"
                        play={this.play}
                        mute={this.mute}
                        timeChange={this.customTime}
                        timeValue={this.state.currentTime}
                        mediaLength={this.state.length}
                        volChange={this.customVolume}
                        time={this.state.formattedTime}
                        length={this.state.formattedLength}
                    />
                </div>
            )
        }
    }
}

export default MediaPlayer;