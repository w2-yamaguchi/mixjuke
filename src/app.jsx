import axios from 'axios';
import path from 'path';
import uuidv1 from 'uuid/v1';

import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { AppBar, Card, CardHeader, CardText, GridList, GridTile, RaisedButton, Slider, TextField } from 'material-ui';

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
            flag: 0
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

            axios.post('http://13.113.255.229:8081/file_upload', formData)
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
            axios.get('http://localhost:3000')
            .then((response) => {
                console.log(this.state.flag);
            })
            .catch((error) => {
                console.log(error);
            });
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
                    <RaisedButton label="Mix" secondary={true} fullWidth={true} onClick={requestMix} />
                </article>
            </MuiThemeProvider>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
