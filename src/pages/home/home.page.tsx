import {Component} from 'react';
import ReactDOM from 'react-dom';
//import {render} from 'react-dom';
import * as THREE from 'three';
import {DirectionalLight} from 'three';
//import {Post} from '../../common/interface/post.interface';
//import PostsGrid from '../../components/posts-grid/posts-grid.component';

class Home extends Component{
    componentDidMount(){
    const scene = new THREE.Scene();


    const geometry = new THREE.BoxGeometry(3,1,3);
        const material = new THREE.MeshLambertMaterial({ color: 0xfb8e00 });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0,0,0);
    scene.add(mesh);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
    directionalLight.position.set(10, 20, 0);
    scene.add(directionalLight);

    const width = 10;
    const height = width * (window.innerHeight / window.innerWidth);
    const camera = new THREE.OrthographicCamera(
        width / -2,
        width / 2,
        height / 2,
        height / -2,
        1,
        100
    );

    camera.position.set(4, 4, 4);
    camera.lookAt(0, 0, 0);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    //var renderer = new THREE.WebGLRenderer();
    //renderer.setSize( window.innerWidth, window.innerHeight );
    //document.body.appendChild( renderer.domElement );

    var animate = function () {
      requestAnimationFrame( animate );
      renderer.render( scene, camera );
    };
    animate();
    ReactDOM.findDOMNode(this.refs.animation)?.appendChild(renderer.domElement);

    }
  render() {
    return (
        <div ref="animation"></div>
        )
  }
  

}
/*const Home: React.FC = () => {
    return (
        <div className="home">
        </div>
    )
}
 */

export default Home;
