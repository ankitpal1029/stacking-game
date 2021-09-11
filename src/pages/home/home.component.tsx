import axios from 'axios';
import React, {useContext, useEffect, useState} from 'react';
import { useHistory} from 'react-router';
import {AuthContext} from '../../contexts/auth.context';
import LeaderBoard from './leaderboard.component';
import clip from './homepage.mp4';


const Home: React.FC = () => {

    const history = useHistory();
    const [ leaderBoard , setLeaderBoard ] = useState();
    let userCtx = useContext(AuthContext);


    
    function clickHandler(){
        history.push('/game');
    }

    useEffect(() => {
        axios({
                method:"GET",
                url:"https://stacking-game.herokuapp.com/leaderboard",
            }).then((response) => {
                setLeaderBoard(response.data.users);
        });

    }, [])

    return (
        <div>


            <div className="center">
                <video 
                    autoPlay 
                    muted 
                    loop 
                    id="myVideo"
                    style={{
                        position: "absolute",
                        width: "100%",
                        left: "50%",
                        top: "50%",
                        height: "100%",
                        objectFit: "cover",
                        transform: "translate(-50%, -50%)",
                        zIndex:-1 
                    }}
                >
                  <source src={clip} type="video/mp4"/>
                </video>

                {
                    userCtx && userCtx.auth === true ?

                <div className="container">
                     <div className="row">
                        <div className="col s12">
                          <div className="card">
                            <div className="card-image">
                                {/*<span className="card-title">Card Title</span>*/}
                            </div>
                            <div className="card-content">
                                <h3>Your Current HighScore is { userCtx.user[0].highscore}</h3>
                            </div>

                              <button onClick={clickHandler} className="btn lighten-1 z-depth-0">
                                  Click To Start Playing
                              </button>
                          </div>
                        </div>
                      </div>
            
                    
                </div>
                    :

                    <div></div>
                }

                <div className="container">
                     <div className="row">
                        <div className="col s12">
                          <div className="card">
                              <table className="table highlight centered responsive-table">
                                  <thead>
                                      <tr>
                                          <th>Rank</th>
                                          <th>Name</th>
                                          <th>HighScore</th>
                                      </tr>
                                  </thead>
                                      <LeaderBoard />
                              </table>



                          </div>
                        </div>
                      </div>

                </div>
            </div>




        </div>
        
    )
}

export default Home;
