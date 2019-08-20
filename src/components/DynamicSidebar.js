import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { connect } from 'dva';
import { Tree } from 'antd';


const { TreeNode } = Tree;



const { Header, Content, Footer, Sider } = Layout;


class DynamicSidebar extends Component {
    componentDidMount() {
        const projectCode = 'TPL';
        const suiteCode = 'HWO';

        const { dispatch } = this.props;
        dispatch({
            type: 'dynamicSidebarRedux/fetchListSuiteByProjectCode',
            projectCode,
        }),
        dispatch({
            type: 'dynamicSidebarRedux/fetchListTestCaseBySuiteCode',
            suiteCode,
        })
    }
    state = {
        collapsed: false,
        treeData: [
            { title: 'Expand to load', key: '0' },
            { title: 'Expand to load', key: '1' },
            { title: 'Tree Node', key: '2', isLeaf: true },
          ],
    };

    // trigger when click expand, minimal sidebar
    onCollapse = (collapsed) => {
        this.setState({ collapsed });
    }

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    onLoadData = treeNode =>
    new Promise(resolve => {
      if (treeNode.props.children) {
        resolve();
        return;
      }
      setTimeout(() => {
        treeNode.props.dataRef.children = [
          { title: 'Child Node', key: `${treeNode.props.eventKey}-0` },
          { title: 'Child Node', key: `${treeNode.props.eventKey}-1` },
        ];
        this.setState({
          treeData: [...this.state.treeData],
        });
        resolve();
      }, 1000);
    });

    renderTreeNodes = data =>
    data.map(item => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode key={item.key} {...item} dataRef={item} />;
    });

    render() {
        const { listTestSuite } = this.props;
        const { listTestCase } = this.props;

        console.log(listTestSuite);
        console.log(listTestCase);

        return (
            <div>
                <Sider
                    style={{
                        overflow: 'auto',
                        height: '100vh',
                        position: 'relative',
                        left: 0,
                        backgroundColor: 'white'
                    }}
                    collapsible
                    collapsed={this.state.collapsed}
                    onCollapse={this.onCollapse}
                    trigger={null}
                >   
                    <Icon
                    className="trigger"
                    type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                    onClick={this.toggle}
                    />
                    
                    <Tree loadData={this.onLoadData}>{this.renderTreeNodes(this.state.treeData)}</Tree>
                </Sider>
            </div>
            
        );
    }
}


export default connect(({dynamicSidebarRedux}) => ({
    listTestSuite: dynamicSidebarRedux.suites,
    listTestCase: dynamicSidebarRedux.testcases,
  }))(DynamicSidebar);