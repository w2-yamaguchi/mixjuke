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
                    title: '音源1',
                    avatar: '/assets/note_brown.png'
                },
                {
                    title: '音源2',
                    avatar: '/assets/note_green.png'
                },
                {
                    title: '音源3',
                    avatar: '/assets/note_navy.png'
                },
                {
                    title: '音源4',
                    avatar: '/assets/note_brown.png'
                },
                {
                    title: '音源5',
                    avatar: '/assets/note_green.png'
                },
                {
                    title: '音源6',
                    avatar: '/assets/note_navy.png'
                },
            ]
        };
    }

    render() {
        const notes = this.state.notes;
        console.log(notes);

        return (
            <MuiThemeProvider>
                <article>
                    <AppBar title="MixJuke" />
                    <GridList>
                        {notes.map((note) => (
                            <GridTile>
                                <Card>
                                    <CardHeader title={note.title} avatar={note.avatar} />
                                    <CardText>
                                        <TextField hintText="file path" />
                                        <RaisedButton label="browse" />
                                    </CardText>
                                </Card>
                            </GridTile>
                        ))}
                    </GridList>
                    <Slider defaultValue={0.5} />
                    <RaisedButton label="Mix" primary={true} fullWidth={true} />
                </article>
            </MuiThemeProvider>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
