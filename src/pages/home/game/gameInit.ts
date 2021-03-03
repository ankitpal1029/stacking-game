import * as THREE from 'three';
import * as CANNON from 'cannon';

class Game{
    private scene: THREE.Scene;
    private renderer: THREE.WebGLRenderer;
    private camera: THREE.OrthographicCamera;
    private originalBoxSize: number;
    private world: CANNON.World;

    private stack: any[] = [];
    private boxHeight: number = 1;
    private overhangs: any[] = [];
    constructor(){
        this.originalBoxSize = 3;
        this.scene = new THREE.Scene();
        this.world = new CANNON.World();
        this.world.gravity.set(0, -10, 0);
        this.world.solver.iterations = 40;

        this.addLayer(0, 0, this.originalBoxSize, this.originalBoxSize, 'a');
        this.addLayer(-10, 0, this.originalBoxSize, this.originalBoxSize, 'x');



        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        this.scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
        directionalLight.position.set(10, 20, 0);
        this.scene.add(directionalLight);

        const width = 10;
        const height = width * (window.innerHeight / window.innerWidth);
        this.camera = new THREE.OrthographicCamera(
            width / -2,
            width / 2,
            height / 2,
            height / -2,
            1,
            100
        );

        this.camera.position.set(4, 4, 4);
        this.camera.lookAt(0, 0, 0);
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        
    }
    cannonReturner(){
        return ({
            world:this.world,
            overhangs:this.overhangs
        }
        );
    }


    addLayer(x:number, z:number, width:number, depth:number, direction:string){
        const y = this.boxHeight * this.stack.length; // Add the new box one layer higher
        const layer:any = this.generateBox(x, y, z, width, depth, false);
        layer.direction = direction;
        this.stack.push(layer);
    }

    generateBox(x:number, y:number,z:number, width:number, depth:number, falls: boolean){
        const geometry = new THREE.BoxGeometry(width, this.boxHeight, depth);

        const color = new THREE.Color(`hsl(${30 + this.stack.length * 4}, 100%, 50%)`);
        const material = new THREE.MeshLambertMaterial({ color });

        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(x, y, z);

        
        this.scene.add(mesh);

        const shape = new CANNON.Box(
            new CANNON.Vec3(width /2, this.boxHeight /2, depth/2)
        )
        let mass = falls? 5: 0;
        const body = new CANNON.Body({mass, shape});
        body.position.set(x, y, z);
        this.world.addBody(body);

        return{
            threejs: mesh,
            cannonjs: body,
            width,
            depth
        }

        }

        addOverhang(x:number, z:number, width:number, depth:number){
            const y = this.boxHeight * (this.stack.length - 1);
            const overhang = this.generateBox(x, y, z, width, depth, true)
            this.overhangs.push(overhang);
        }
    render(){
        return({
            renderer:this.renderer,
            scene: this.scene,
            camera: this.camera,
            stack: this.stack
        })

    }

}

export default Game;
