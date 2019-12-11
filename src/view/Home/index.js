import React, { Component } from 'react';
import { Row, Col, Icon, Card } from 'antd';
import echarts from 'echarts';

let addListenScreen = (func) => {
  window.addEventListener('resize', func);
};
let removeListenScreen = (func) => {
  window.removeEventListener('resize', func);
};

let addListenElm = (func, dom) => {
  dom.addEventListener('transitionend', func);
};
let removeListenElm = (func, dom) => {
  dom.removeEventListener('transitionend', func);
};

class home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      contens: {
        icons: [
          {
            iconClass: 'github',
            title: 'GitHub',
            conten: '123',
            bg: '#24292e'
          },
          {
            iconClass: 'qq',
            title: 'QQ',
            conten: '123',
            bg: '#967adc'
          },
          {
            iconClass: 'wechat',
            title: '微信',
            conten: '123',
            bg: '#70ca63'
          },
          {
            iconClass: 'zhihu',
            title: '知乎',
            conten: '123',
            bg: '#0084ff'
          },
        ]
      }
    };
    this.onClick = this.onClick.bind(this);
    this.echarts = null;
    this.echarts1 = null;
    this.echarts2 = null;
  }

  componentDidMount() {
    let asideElm = document.querySelector('.aside');
    this.initChart();
    this.initChart1();
    this.initChart2();
    addListenScreen(this.resize);
    addListenElm(this.resizeElm, asideElm);
  }

  componentWillUnmount() {
    let asideElm = document.querySelector('.aside');
    removeListenScreen(this.resize);
    removeListenElm(this.resizeElm, asideElm)
  }

  resize = (e) => {
    this.echarts.resize();
    this.echarts1.resize();
    this.echarts2.resize();
  }

  resizeElm = (e) => {
    if (e.propertyName === 'width') {
      this.echarts.resize();
      this.echarts1.resize();
      this.echarts2.resize();
    }
  }

  onClick() {
    this.setState({
      show: !this.state.show,
      num: (this.state.num + 1) % 2
    })
  }

  initChart() {
    this.echarts = echarts.init(document.getElementById('charts'));
    this.echarts.setOption({
      title: {
        text: '堆叠区域图'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      legend: {
        data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
      },
      /* toolbox: {
         feature: {
           saveAsImage: {}
         }
       },*/
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: '邮件营销',
          type: 'line',
          stack: '总量',
          areaStyle: {},
          data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
          name: '联盟广告',
          type: 'line',
          stack: '总量',
          areaStyle: {},
          data: [220, 182, 191, 234, 290, 330, 310]
        },
        {
          name: '视频广告',
          type: 'line',
          stack: '总量',
          areaStyle: {},
          data: [150, 232, 201, 154, 190, 330, 410]
        },
        {
          name: '直接访问',
          type: 'line',
          stack: '总量',
          areaStyle: { normal: {} },
          data: [320, 332, 301, 334, 390, 330, 320]
        },
        {
          name: '搜索引擎',
          type: 'line',
          stack: '总量',
          label: {
            normal: {
              show: true,
              position: 'top'
            }
          },
          areaStyle: { normal: {} },
          data: [820, 932, 901, 934, 1290, 1330, 1320]
        }
      ]
    });
  }

  initChart1() {
    this.echarts1 = echarts.init(document.getElementById('charts1'));
    this.echarts1.setOption({
      color: ['#3398DB'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
          type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: '直接访问',
          type: 'bar',
          barWidth: '60%',
          data: [10, 52, 200, 334, 390, 330, 220]
        }
      ]
    })
  }

  initChart2() {
    this.echarts2 = echarts.init(document.getElementById('charts2'));
    this.echarts2.setOption({
      title: {
        text: '南丁格尔玫瑰图',
        subtext: '纯属虚构',
        x: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        x: 'center',
        y: 'bottom',
        data: ['rose1', 'rose2', 'rose3', 'rose4', 'rose5', 'rose6', 'rose7', 'rose8']
      },
      toolbox: {
        show: true,
        feature: {
          mark: { show: true },
          dataView: { show: true, readOnly: false },
          magicType: {
            show: true,
            type: ['pie', 'funnel']
          },
          restore: { show: true },
          saveAsImage: { show: true }
        }
      },
      calculable: true,
      series: [
        {
          name: '半径模式',
          type: 'pie',
          radius: [20, 110],
          center: ['25%', '50%'],
          roseType: 'radius',
          label: {
            normal: {
              show: false
            },
            emphasis: {
              show: true
            }
          },
          lableLine: {
            normal: {
              show: false
            },
            emphasis: {
              show: true
            }
          },
          data: [
            { value: 10, name: 'rose1' },
            { value: 5, name: 'rose2' },
            { value: 15, name: 'rose3' },
            { value: 25, name: 'rose4' },
            { value: 20, name: 'rose5' },
            { value: 35, name: 'rose6' },
            { value: 30, name: 'rose7' },
            { value: 40, name: 'rose8' }
          ]
        },
        {
          name: '面积模式',
          type: 'pie',
          radius: [30, 110],
          center: ['75%', '50%'],
          roseType: 'area',
          data: [
            { value: 10, name: 'rose1' },
            { value: 5, name: 'rose2' },
            { value: 15, name: 'rose3' },
            { value: 25, name: 'rose4' },
            { value: 20, name: 'rose5' },
            { value: 35, name: 'rose6' },
            { value: 30, name: 'rose7' },
            { value: 40, name: 'rose8' }
          ]
        }
      ]
    })
  }

  render() {
    const { contens } = this.state;
    return (
      <div >
        <Row gutter={16}>
          {contens.icons.map((item) => {
            return (
              <Col lg={6} key={item.title}>
                <div
                  className="base-style"
                  style={{
                    background: `${item.bg}`
                  }}
                >
                  <Icon type={item.iconClass} />
                  <div>
                    <span>{item.conten}</span>
                    <div>{item.title}</div>
                  </div>
                </div>
              </Col>
            )
          })}
        </Row>
        <Row>
          <Col span={24}>
            <Card title="图表" bordered={true} style={{ width: '100%', marginBottom: '1rem' }}>
              <div className="charts" id="charts"></div>
            </Card>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col lg={12}>
            <Card bordered={true} style={{ width: '100%', marginBottom: '1rem' }}>
              <div className="charts" id="charts1"></div>
            </Card>
          </Col>
          <Col lg={12}>
            <Card bordered={true} style={{ width: '100%', marginBottom: '1rem' }}>
              <div className="charts" id="charts2"></div>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default home;