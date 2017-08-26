import axios from 'axios';
import path from 'path';
import uuidv1 from 'uuid/v1';

import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { AppBar, Card, CardHeader, CardText, GridList, GridTile, RaisedButton, Slider, TextField } from 'material-ui';
import ReactPlayer from 'react-player';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notes: [
                {
                    id: 'note1',
                    title: '音源1',
                    avatar: '/assets/note_brown.png',
                    music: {}
                },
                {
                    id: 'note2',
                    title: '音源2',
                    avatar: '/assets/note_green.png',
                    music: {}
                },
                {
                    id: 'note3',
                    title: '音源3',
                    avatar: '/assets/note_navy.png',
                    music: {}
                },
                {
                    id: 'note4',
                    title: '音源4',
                    avatar: '/assets/note_brown.png',
                    music: {}
                },
                {
                    id: 'note5',
                    title: '音源5',
                    avatar: '/assets/note_green.png',
                    music: {}
                },
                {
                    id: 'note6',
                    title: '音源6',
                    avatar: '/assets/note_navy.png',
                    music: {}
                }
            ],
            flag: 0,
            mixedMusic: 'http://localhost:3000/assets/Dork.mp3'
        };
    }

    render() {
        let notes = this.state.notes;
        const dirname = uuidv1();

        const readFile = (e) => {
            e.preventDefault();
            notes.map((item, index) => {
                // 条件に合致すれば音楽ファイルを代入
                if (item.id == e.target.id) {
                    item.music = e.target.files[0];
                    // item.music.name = path.join(dirname, item.music.name);
                }
            });

            // フィールド変数の notes を更新
            this.setState({ notes: notes });
        };

        // const uploadFile = async (music) => {
        const uploadFile = (music) => {
            let formData = new FormData();
            formData.append('file', music);
            formData.append('dir', dirname);

            axios.post('http://localhost:8081/file_upload', formData)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });

            this.setState({ flag: this.state.flag + 1 });
            return this.state.flag;
        };

        // const uploadFiles = async () => {
        const uploadFiles = () => {
            let noteFiles = this.state.notes;
            let flag = 0;

            noteFiles.map((note) => {
                flag = uploadFile(note.music);
            });

            // axios.get('http://localhost:3000')
            // .then(function (response) {
            //     console.log(flag);
            // })
            // .catch(function (error) {
            //     console.log(flag);
            // });
        };

        const requestMix = () => {
            axios.get('http://localhost:4000/mix_juke',{
		params: {
			id: dirname
		}})
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
        };

        const play = (e) => {
            e.preventDefault();
            document.querySelector('#player').playing = true;
            // let player = document.querySelector('#player');
            // player.playing = !player.playing;
            // console.log(player.playing);
        };

        return (
            <MuiThemeProvider>
                <article>
                    <AppBar title="MixJuke" />
                    <GridList>
                        {notes.map((note) => (
                            <GridTile key={note.id}>
                                <Card>
                                    <CardHeader title={note.title} avatar={note.avatar} />
                                    <CardText>
                                        <RaisedButton containerElement="label" label="browse">
                                            <input id={note.id} type="file" onChange={readFile} />
                                        </RaisedButton>
                                    </CardText>
                                </Card>
                            </GridTile>
                        ))}
                    </GridList>
                    <RaisedButton label="Upload" primary={true} fullWidth={true} onClick={uploadFiles} />
                    <RaisedButton label="Mix" primary={true} fullWidth={true} onClick={requestMix} />
                    <ReactPlayer id="player" url={this.state.mixedMusic} playing={false} />
                    <RaisedButton label="Play" secondary={true} fullWidth={true} onClick={play} />
                </article>
            </MuiThemeProvider>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
