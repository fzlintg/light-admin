<template>
  <div>
    <!-- <a-radio-group v-model:value="db" @change="loadData(db)">
      <a-radio-button value="base">base</a-radio-button>
      <a-radio-button value="main">main</a-radio-button>
    </a-radio-group> -->
    <light-form logic="dbtable.select" remote ref="dbTableRef" class="mt-3" @change-db="loadData" />
    <div id="myDiagramDiv" ref="diagram" class="dbDiagram"></div>
    <light-form logic="dbtable.edit" remote ref="lightFormRef" />
  </div>
</template>
<script lang="ts">
  import go from '@/assets/js/go3.js';
  import { defHttp as axios } from '@utils/http/axios';
  //import { RadioGroup as ARadioGroup, RadioButton as ARadioButton } from 'ant-design-vue';
  //import vform from '@c/Vform/index.vue';

  // import VabJsonViewer from 'vue-json-viewer';
  export default defineComponent({
    name: 'DbDiagram',
    //components: { ARadioGroup, ARadioButton },
    // components: { vform },
    setup() {
      const db = ref('base');
      let myDiagram: any = {};
      const state = reactive({
        diagram: null,
        queryForm: null,
        model: {},
        tabName: 'chart',
        showEditForm: false,
        node: null,
        formEdit: null,
        formData: {},
        lightFormRef: null,
      });
      const openEditForm = async (node) => {
        const { db, key, db_id } = node.data;
        // const items = node.data.items;
        let config = await axios.get({ url: `/api/model/tableModel/${db}/${key}` });
        state.lightFormRef.vformRef
          .getItemRef('modal')
          .show({ ...config, db, table: key }, { db, table: key, db_id }, { raw: true });
      };
      go.Shape.defineFigureGenerator('Decision', 'Diamond');

      const init = async () => {
        const $ = go.GraphObject.make; // for conciseness in defining templates
        myDiagram = new go.Diagram(
          'myDiagramDiv', // must name or refer to the DIV HTML element
          {
            allowDelete: true,
            allowCopy: true,
            layout: $(go.ForceDirectedLayout),
            'undoManager.isEnabled': true,
            'themeManager.changesDivBackground': true,
            'themeManager.currentTheme': 'light',
          },
        );
        myDiagram.themeManager.set('light', {
          colors: {
            primary: '#f7f9fc',
            green: '#62bd8e',
            blue: '#3999bf',
            purple: '#7f36b0',
            red: '#c41000',
          },
        });

        // the template for each attribute in a node's array of item data
        const itemTempl = $(
          go.Panel,
          'Horizontal',
          { margin: new go.Margin(2, 0) },
          $(
            go.Shape,
            { desiredSize: new go.Size(15, 15), strokeWidth: 0, margin: new go.Margin(0, 5, 0, 0) },
            new go.Binding('figure', 'figure'),
            new go.ThemeBinding('fill', 'color').ofData(),
          ),
          $(
            go.TextBlock,
            { font: '14px sans-serif', stroke: 'black' },
            new go.Binding('text', 'name'),
            new go.Binding('font', 'iskey', (k) =>
              k ? 'italic 14px sans-serif' : '14px sans-serif',
            ),
            new go.ThemeBinding('stroke', 'text'),
          ),
        );

        // define the Node template, representing an entity
        myDiagram.nodeTemplate = $(
          go.Node,
          'Auto', // the whole node panel
          {
            selectionAdorned: true,
            resizable: true,
            layoutConditions: go.LayoutConditions.Standard & ~go.LayoutConditions.NodeSized,
            fromSpot: go.Spot.LeftRightSides,
            toSpot: go.Spot.LeftRightSides,
          },
          {
            doubleClick: async (e: any, node: any) => {
              await openEditForm(node);
            },
          },
          new go.Binding('location', 'location').makeTwoWay(),
          // whenever the PanelExpanderButton changes the visible property of the "LIST" panel,
          // clear out any desiredSize set by the ResizingTool.
          new go.Binding('desiredSize', 'visible', (v) => new go.Size(NaN, NaN)).ofObject('LIST'),
          // define the node's outer shape, which will surround the Table
          $(
            go.Shape,
            'RoundedRectangle',
            { stroke: '#e8f1ff', strokeWidth: 3 },
            new go.ThemeBinding('fill', 'primary'),
          ),
          $(
            go.Panel,
            'Table',
            { margin: 8, stretch: go.Stretch.Fill },
            $(go.RowColumnDefinition, { row: 0, sizing: go.Sizing.None }),
            // the table header
            $(
              go.TextBlock,
              {
                row: 0,
                alignment: go.Spot.Center,
                margin: new go.Margin(0, 24, 0, 2), // leave room for Button
                font: 'bold 18px sans-serif',
              },
              new go.Binding('text', 'title'),
              new go.ThemeBinding('stroke', 'text'),
            ),
            // the collapse/expand button
            $(
              'PanelExpanderButton',
              'LIST', // the name of the element whose visibility this button toggles
              { row: 0, alignment: go.Spot.TopRight },
              new go.ThemeBinding('ButtonIcon.stroke', 'text'),
            ),
            $(
              go.Panel,
              'Table',
              { name: 'LIST', row: 1, alignment: go.Spot.TopLeft },

              $(
                go.Panel,
                'Vertical',
                {
                  row: 1,
                  name: 'NonInherited',
                  alignment: go.Spot.TopLeft,
                  margin: new go.Margin(10), //留点空间
                  defaultAlignment: go.Spot.Left,
                  itemTemplate: itemTempl,
                },
                new go.Binding('itemArray', 'items'),
              ),
              $(
                go.TextBlock,
                'Inherited Attributes',
                {
                  row: 2,
                  alignment: go.Spot.Left,
                  margin: new go.Margin(3, 24, 3, 2), // leave room for Button
                  font: 'bold 15px sans-serif',
                },
                new go.Binding(
                  'visible',
                  'inheritedItems',
                  (arr) => Array.isArray(arr) && arr.length > 0,
                ),
                new go.ThemeBinding('stroke', 'text'),
              ),
              $(
                'PanelExpanderButton',
                'Inherited',
                { row: 2, alignment: go.Spot.Right },
                new go.Binding(
                  'visible',
                  'inheritedItems',
                  (arr) => Array.isArray(arr) && arr.length > 0,
                ),
                new go.ThemeBinding('ButtonIcon.stroke', 'text'),
              ),
              $(
                go.Panel,
                'Vertical',
                {
                  row: 3,
                  name: 'Inherited',
                  alignment: go.Spot.TopLeft,
                  defaultAlignment: go.Spot.Left,
                  itemTemplate: itemTempl,
                },
                new go.Binding('itemArray', 'inheritedItems'),
              ),
            ),
          ), // end Table Panel
        ); // end Node

        // define the Link template, representing a relationship
        myDiagram.linkTemplate = $(
          go.Link, // the whole link panel
          {
            selectionAdorned: true,
            layerName: 'Background',
            reshapable: true,
            routing: go.Routing.AvoidsNodes,
            corner: 5,
            curve: go.Curve.JumpOver,
          },
          $(
            go.Shape, // the link shape
            { stroke: '#f7f9fc', strokeWidth: 3 },
            new go.ThemeBinding('stroke', 'link'),
          ),
          $(
            go.TextBlock, // the "from" label
            {
              textAlign: 'center',
              font: 'bold 14px sans-serif',
              stroke: 'black',
              segmentIndex: 0,
              segmentOffset: new go.Point(NaN, NaN),
              segmentOrientation: go.Orientation.Upright,
            },
            new go.Binding('text', 'text'),
            new go.ThemeBinding('stroke', 'text'),
          ),
          $(
            go.TextBlock, // the "to" label
            {
              textAlign: 'center',
              font: 'bold 14px sans-serif',
              stroke: 'black',
              segmentIndex: -1,
              segmentOffset: new go.Point(NaN, NaN),
              segmentOrientation: go.Orientation.Upright,
            },
            new go.Binding('text', 'toText'),
            new go.ThemeBinding('stroke', 'text'),
          ),
        );
        state.diagram = myDiagram;
      };
      const loadData = async (db: any) => {
        const { nodeDataArray, linkDataArray } = await axios.get({
          url: `/api/model/dbDiagram/${db}`,
        });
        state.model = {
          copiesArrays: true,
          copiesArrayObjects: true,
          nodeDataArray,
          linkDataArray,
        };
        myDiagram.model = new go.GraphLinksModel(state.model);
      };
      onMounted(async () => {
        await init();
        await loadData(db.value);
      });
      return {
        ...toRefs(state),
        db,
        loadData,
        // reload,
        // save,
        // getCacheChart,
        // submitData,
        // saveData,
      };
    },
  });
</script>
<style>
  .dbDiagram {
    width: 100%;
    height: 800px;
    background-color: rgb(236 236 236);
  }
</style>
