import { NodeModel, DefaultNodeModel, Toolkit, DefaultPortModel} from "storm-react-diagrams";
import { merge, filter } from 'lodash'

export class CustomNodeModel extends NodeModel {
	constructor(name,color,diagram) {
    super("custom");
    this.name = "test",
		this.color = "#000000"
    this.diagram = diagram;
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

		let model = this.diagram.props.engine.getDiagramModel();
    let selectedItem = model.getSelectedItems();
    let newNode;
    selectedItem.forEach((item) => {
      console.log(item)
      if (item instanceof NodeModel) {
        newNode = new DefaultNodeModel(new Date().getTime(), "#FF0000");
        let newInPort = newNode.addInPort('in')
        let newOutport = newNode.addOutPort('out')
        console.log(item.getOutPorts())
        let newOutLink = item.getOutPorts()[0].link(newInPort)
        newNode.setPosition(item.x, item.y + 100);
        model.addAll(newNode, newOutLink)
      }/*  else if (item instanceof PointModel) {
        if (!item.parent.getSourcePort().in) {
          console.log(item)
          let nodeOutport = item.parent.getSourcePort();
          let nodeOutTarget = item.parent.getTargetPort();
          let newOutLink = newNode.getOutPorts()[0].link(nodeOutTarget)
          console.log(nodeOutTarget)
          console.log(newOutLink)
          console.log( nodeOutTarget.getLinks())
          item.remove()
        
          model.addAll(newOutLink)

        }
      } */
    });
    this.diagram.forceUpdate();
  }

}