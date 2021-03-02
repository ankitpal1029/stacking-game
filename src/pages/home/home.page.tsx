import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Game from './game/gameInit';

class Home extends Component<{},{gameStarted:boolean}>{

    private gameContainer: any;
    private boxHeight:number = 1;
    private originalBoxSize: number = 3;

    constructor(props:any){
        super(props);
        this.gameContainer = React.createRef();
        this.state = {
            gameStarted:false
        }

    }


    animate(scene:THREE.Scene, camera:THREE.OrthographicCamera, stack: any[], renderer:THREE.WebGLRenderer) {
        const speed = 0.15;

        const topLayer = stack[stack.length - 1];
        console.log(topLayer);
        topLayer.threejs.position[topLayer.direction] += speed;

        if(camera.position.y < this.boxHeight * (stack.length - 2) + 4){
            camera.position.y += speed;

        }

        return renderer.render( scene, camera );
    };
    

    componentDidMount(){
        let gameRender: Game= new Game();
        let { renderer, scene, camera, stack} = gameRender.render();

        window.addEventListener("click", () => {
            if(!this.state.gameStarted){
                console.log(stack);
                renderer.setAnimationLoop(() => this.animate(scene, camera, stack, renderer));
                this.setState({
                    gameStarted:true
                });
            }else{
                const topLayer = stack[stack.length - 1];
                const direction = topLayer.direction;

                const nextX = direction === "x"? 0: -10;
                const nextZ = direction === "z"? 0: -10;
                const newWidth = this.originalBoxSize;
                const newDepth = this.originalBoxSize;
                const nextDirection = direction === "x"?"z":"x";

                gameRender.addLayer(nextX, nextZ, newWidth, newDepth, nextDirection);
            }
        })
    
        ReactDOM.findDOMNode(this.gameContainer.current)?.appendChild(renderer.domElement);
    }
    
  render() {
    return (
        <div ref={this.gameContainer}></div>
        )
  }
  

}

export default Home;
