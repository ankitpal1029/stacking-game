import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {UserType} from '../../contexts/auth.types';

const LeaderBoard: React.FC = () => {
    const [ loading, setLoading ] = useState(true);
    const [ leaderBoardInfo, setLeaderBoardInfo ] = useState({} as UserType[]);

    useEffect(() => {
        axios({
                method:"GET",
                url:"https://stacking-game.herokuapp.com/leaderboard",
            }).then((response) => {
                console.log(response.data.users[0]);
                setLeaderBoardInfo(response.data.users);
                setLoading(false);
        });

    },[])


    return(
        <tbody>
        {loading ? 
          <tr>
              <td className="border-0">loading.. </td>
              <td className="border-0">loading.. </td>
              <td className="border-0">loading.. </td>
          </tr>

            :
                leaderBoardInfo.map((user, index) => {
                            return(
                              <tr key={index}>
                                  <td className="border-0">{index+1}</td>
                                  <td className="border-0">{user.name}</td>
                                  <td className="border-0">{user.highscore}</td>
                              </tr>
                            )
                        })

        }
        </tbody>
    )
}
export default LeaderBoard;
