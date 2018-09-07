import { NodeModel, DefaultNodeModel, Toolkit, DefaultPortModel} from "storm-react-diagrams";
import { merge, filter } from 'lodash'

export class CustomNodeModel extends NodeModel {
	constructor(name,color,ee) {
    super("custom");
    this.name = "test",
		this.color = "#000000"
    this.ee = ee;
  }

  addInPort(label) {
		return this.addPort(new DefaultPortModel(true, Toolkit.UID(), label));
	}

	addOutPort(label) {
		return this.addPort(new DefaultPortModel(false, Toolkit.UID(), label));
	}

	deSerialize(object, engine) {
		super.deSerialize(object, engine);
		this.name = object.name;
		this.color = object.color;
	}

	serialize() {
		return merge(super.serialize(), {
			name: this.name,
			color: this.color
		});
	}

	getInPorts(): DefaultPortModel[] {
		return filter(this.ports, portModel => {
			return portModel.in;
		});
	}

	getOutPorts(): DefaultPortModel[] {
		return filter(this.ports, portModel => {
			return !portModel.in;
		});
	}
  
  showMenu(){
    this.open = true;
    console.log('show')
  }

  hideMenu(){
    this.open =false
    console.log('hide')
  }

  appendNode() {
    console.log(this)
    //this.ee.emit('append-node',this)
  }

}