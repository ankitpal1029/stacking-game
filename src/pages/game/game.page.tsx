import React, {Component, useContext} from 'react';
import ReactDOM from 'react-dom';
import Game from './gamelogic/gameInit';
import * as CANNON from 'cannon';
import "./game.page.css";
import axios from 'axios';
import {AuthContext} from '../../contexts/auth.context';

class GamePage extends Component<{},{gameStarted:boolean, gameEnded:boolean, score:number}>{

    private gameContainer: any;
    private boxHeight:number = 1;

    constructor(props:any){
        super(props);
        this.gameContainer = React.createRef();
        this.state = {
            gameStarted:false,
            gameEnded:false,
            score:0
        }

    }
    cutBox(topLayer: any, overlap: number, size:number, delta: number){
        const direction = topLayer.direction;
        const newWidth = direction === "x"? overlap: topLayer.width;
        const newDepth = direction === "z"? overlap: topLayer.depth;

        topLayer.width = newWidth;
        topLayer.depth = newDepth;

        topLayer.threejs.scale[direction] = overlap /size;
        topLayer.threejs.position[direction] -= delta/2;

        topLayer.cannonjs.position[direction] -= delta/2;

        const shape = new CANNON.Box(
            new CANNON.Vec3(newWidth/2, this.boxHeight, newDepth/2)
        );

        topLayer.cannonjs.shapes = [];
        topLayer.cannonjs.addShape(shape);
    }

    updatePhysics(world: CANNON.World, overhangs: any[]){
        world.step(1/60);
        overhangs.forEach((element) => {
            element.threejs.position.copy(element.cannonjs.position);
            element.threejs.quaternion.copy(element.cannonjs.quaternion);
        })


    }


    animate(scene:THREE.Scene, camera:THREE.OrthographicCamera, stack: any[], renderer:THREE.WebGLRenderer, world: CANNON.World,overhangs:any[]) {
        const speed = 0.15;

        const topLayer = stack[stack.length - 1];
        topLayer.threejs.position[topLayer.direction] += speed;
        topLayer.cannonjs.position[topLayer.direction] += speed;

        if(camera.position.y < this.boxHeight * (stack.length - 2) + 4){
            camera.position.y += speed;

        }
        this.updatePhysics(world,overhangs);

        return renderer.render( scene, camera );
    };

    clickHandler(){

        console.log('make the highscore update request here');

        setTimeout(() => {
            window.location.reload(false);
        },500);
    }
    

    componentDidMount(){

        let gameRender: Game= new Game();
        let { renderer, scene, camera, stack} = gameRender.render();

        window.addEventListener("click", () => {
            if(!this.state.gameStarted){
                let { world, overhangs } = gameRender.cannonReturner();
                renderer.setAnimationLoop(() => this.animate(scene, camera, stack, renderer,world,overhangs ));
                this.setState({
                    gameStarted:true
                });
            }else{
                const topLayer = stack[stack.length - 1];
                const previousLayer = stack[stack.length - 2];

                const direction = topLayer.direction;

                const delta = topLayer.threejs.position[direction] - 
                    previousLayer.threejs.position[direction];

                const overHangSize = Math.abs(delta);

                const size = direction === "x"? topLayer.width: topLayer.depth;

                const overlap = size - overHangSize;

                if(overlap > 0){
                    this.cutBox(topLayer, overlap, size, delta);

                    const newWidth = direction === "x"? overlap: topLayer.width;
                    const newDepth = direction === "z"? overlap: topLayer.depth;

                    topLayer.width = newWidth;
                    topLayer.depth = newDepth;

                    topLayer.threejs.scale[direction] = overlap/size;
                    topLayer.threejs.position[direction] = delta/2;

                    const overHangShift = (overlap /2 + overHangSize /2) * Math.sign(delta);
                    const overHangX = 
                        direction === "x"
                        ? topLayer.threejs.position.x + overHangShift
                        : topLayer.threejs.position.x;

                    const overHangZ = 
                        direction === "z"
                        ? topLayer.threejs.position.z + overHangShift
                        : topLayer.threejs.position.z;

                    const overHangWidth = direction === "x" ? overHangSize: newWidth;
                    const overHangDepth = direction === "z" ? overHangSize: newDepth;
                    
                    // addOverhang
                    gameRender.addOverhang(overHangX, overHangZ, overHangWidth, overHangDepth)



                    const nextX = direction === "x"? topLayer.threejs.position.x: -10;
                    const nextZ = direction === "z"? topLayer.threejs.position.z: -10;
                    const nextDirection = direction === "x"?"z":"x";
                    gameRender.addLayer(nextX, nextZ, newWidth, newDepth, nextDirection);
                    this.setState({
                        score: this.state.score + 1
                    })

                }else{
                    let new_highscore = Math.max(this.context.user[0].highscore, this.state.score);
                    this.setState({
                        gameEnded:true
                    },() => {
                        axios({
                                method:"POST",
                                url:"https://stacking-game.herokuapp.com/update_high_score",
                            data: { _id: this.context.user[0]._id, new_highscore:  new_highscore}
                            }).then((response) => {
                                console.log(response);
                        });

                    });
                    gameRender.addOverhang(
                        topLayer.threejs.position.x, 
                        topLayer.threejs.position.z, 
                        topLayer.width, 
                        topLayer.depth
                    )
                    let { world, overhangs} = gameRender.cannonReturner();
                    world.remove(topLayer.cannonjs);
                    scene.remove(topLayer.threejs);

                }




            }
        })


    
        renderer.domElement.className = `col s4`;
        ReactDOM.findDOMNode(this.gameContainer.current)?.appendChild(renderer.domElement);


        
    }
    
  render() {
    return (
        <div className="game-container" >
            <div id="info">{this.state.score}</div>
            {/*<div className="center-home">

                !this.state.gameStarted && 
                    <div className="btn waves-effect waves-light">
                        Click anywhere on the screen to start
                    </div>
                  
                this.state.gameStarted  &&
                 !this.state.gameEnded &&
                    <div className="col s6 btn waves-effect waves-light" >
                        {this.state.score}
                    </div>
                  


                    </div>*/}
            <div className="center-home">
                <div className=""></div>
                <div className="game" ref={this.gameContainer}></div>
                <div className=""></div>
            </div>
            <div className="center-home">
                {this.state.gameEnded && 
                    <div className="col s6 ">
                    <button onClick={this.clickHandler} className="btn lighten-1 z-depth-0">
                        Click To Go Back To Home
                    </button>
                    </div>
                }
            </div>
        </div>
        )
  }
  

}
GamePage.contextType = AuthContext;

export default GamePage;
