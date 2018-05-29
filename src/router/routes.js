import Hello from '@/components/hello'
import Layout from '@/components/Layout'
import Login from '@/components/login/login'

import AllCustList from '@/components/custManage/AllCustList'
import NoVerifyCustList from '@/components/custManage/NoVerifyCustList'
import TradedCustList from '@/components/custManage/TradedCustList'
import RealNameCustList from '@/components/custManage/RealNameCustList'

import AllOrderList from '@/components/orderManage/allOrderList'
import ApplyList from  '@/components/orderManage/applyList'
import ExamList from  '@/components/orderManage/examList'
import RepaymentList from  '@/components/orderManage/repaymentList'
import PayOffList from  '@/components/orderManage/payOffList'
import RejectList from  '@/components/orderManage/rejectList'

/*import OverdueList from '@/components/afterloanManage/overdueList'
import MinitorList from '@/components/afterloanManage/minitorList'
import CollectionList from '@/components/afterloanManage/collectionList'
import M1List from '@/components/afterloanManage/M1List'*/


import CtrexamList from '@/components/controlManage/CtrexamList'
import CtrallList from '@/components/controlManage/CtrallList'

import About from '@/components/sysContManage/about'
import AMTdeadlineSet from '@/components/sysContManage/AMTdeadlineSet'
import BannerList from '@/components/sysContManage/bannerList'
import FAQList from '@/components/sysContManage/FAQList'
import InfoList from '@/components/sysContManage/infoList'

import ParamSet from '@/components/sysParamManage/ParamSet'
import Dictionary from '@/components/sysParamManage/Dictionary'
import WithdrawRangeSet from '@/components/sysParamManage/withdrawRangeSet'
import AndroidVersionControl from '@/components/sysParamManage/AndroidVersionControl'


import AllOverdueOrderList from '@/components/loanManage/AllOverdueOrderList'
import MinitorList from '@/components/loanManage/MinitorList'
import CollectionList from '@/components/loanManage/CollectionList'
import M1List from '@/components/loanManage/M1List'
import AppH5Question from '@/components/app/H5Question'
import H5About from '@/components/app/H5About'

import CustDetail from '@/components/common/CustDetail'
import OrderDetail from '@/components/common/OrderDetail'
export default [
    {
        path: '/',
//      name: "首页",
        redirect: 'home',
        meta: {
            istoken: false
        },

    },
    {
//      meta: {
//          istoken: false
//      },
        path: '/home',
        alias: '', //默认
        name: '首页',
        component: Layout,
        meta: {
            istoken: true
        },
        children: [
			{
		        path: 'hello',
		        component: Hello,
		        //component: LayoutA,
		        name: "测试",
		        meta: {
		            istoken: true
		        },
		    },
		    {
		        path: 'user/allUserList',
		        component: AllCustList,
		        name: "全部客户",
		        meta: {
		            istoken: true
		        },
		    },
		    {
		        path: 'user/noVerifyList',
		        component: NoVerifyCustList,
		        name: "未实名客户",
		        meta: {
		            istoken: true
		        },
		    },
		    {
		        path: 'user/tradedList',
		        component: TradedCustList,
		        name: "已成交客户",
		        meta: {
		            istoken: true
		        },
		    },
		    {
		        path: 'user/realNameList',
		        component: RealNameCustList,
		        name: "已实名客户",
		        meta: {
		            istoken: true
		        },
		    },
            {
                path:'order/allOrderList',
                component: AllOrderList,
                name:'全部订单',
                meta: {
                    istoken: true
                }
            },
            {
                path:'order/applyList',
                component: ApplyList,
                name:'申请中订单',
                meta: {
                    istoken: true
                }
            },
            {
                path:'order/examList',
                component: ExamList,
                name:'审批中订单',
                meta: {
                    istoken: true
                }
            },
            {
                path:'order/repaymentList',
                component: RepaymentList,
                name:'还款中订单',
                meta: {
                    istoken: true
                }
            },
            {
                path:'order/payOffList',
                component: PayOffList,
                name:'已结清订单',
                meta: {
                    istoken: true
                }
            },
            {
                path:'order/rejectList',
                component: RejectList,
                name:'拒绝订单',
                meta: {
                    istoken: true
                }
            },
            // {
            //     path:'afterloan/overdueList',
            //     component: OverdueList,
            //     name:'全部预期订单'
            // },
            // {
            //     path:'afterloan/minitorList',
            //     component: MinitorList,
            //     name:'放款监测订单'
            // },
            // {
            //     path:'afterloan/collectionList',
            //     component: CollectionList,
            //     name:'预催收订单'
            // },
            // {
            //     path:'afterloan/M1List',
            //     component: M1List,
            //     name:'M1订单'
            // },
            {
                path:'controlOrder/examList',
                component: CtrexamList,
                name:'总控-审批中订单',
                meta: {
                    istoken: true
                }
            },
            {
                path:'controlOrder/allList',
                component: CtrallList,
                name:'总控-全部订单',
                meta: {
                    istoken: true
                }
            },
            {
                path:'sysContent/bannerList',
                component: BannerList,
                name:'banner管理',
                meta: {
                    istoken: true
                }
            },
            {
                path:'sysContent/About',
                component: About,
                name:'APP关于',
                meta: {
                    istoken: true
                }
            },
            {
                path:'sysContent/AMTdeadlineSet',
                component: AMTdeadlineSet,
                name:'金额期限设置',
                meta: {
                    istoken: true
                }
            },
            {
                path:'sysContent/infoList',
                component: InfoList,
                name:'消息推送',
                meta: {
                    istoken: true
                }
            },
            {
                path:'sysContent/FAQList',
                component: FAQList,
                name:'常见问题',
                meta: {
                    istoken: true
                }
            },
            {
                path:'sysParam/paramSet',
                component: ParamSet,
                name:'参数设置',
                meta: {
                    istoken: true
                }
            },
            {
                path:'sysParam/dictionary',
                component: Dictionary,
                name:'数据字典',
                meta: {
                    istoken: true
                }
            },
            {
                path:'sysParam/withdrawRangeSet',
                component: WithdrawRangeSet,
                name:'提现限额设置',
                meta: {
                    istoken: true
                }
            },
          {
            path:'sysParam/androidVersionControl',
            component:AndroidVersionControl,
            name:'安卓版本管理',
            meta: {
              istoken: true
            }
          },
		    {
		    	path: 'afterloan/overdueList',
		        component: AllOverdueOrderList,
		        name: "全部逾期订单",
		        meta: {
		            istoken: true
		        }
		    },
		    {
		    	path: 'afterloan/minitorList',
		        component: MinitorList,
		        name: "放款检测订单",
		        meta: {
		            istoken: true
		        }
		    },
		    {
		    	path: 'afterloan/collectionList',
		        component: CollectionList,
		        name: "预催收订单",
		        meta: {
		            istoken: true
		        }
		    },
		    {
		    	path: 'afterloan/M1List',
		        component: M1List,
		        name: "M1订单",
		        meta: {
		            istoken: true
		        }
		    },

        ]
    },

//  {
//      path: '/login',
//      component: Login,
//      //component: LayoutA,
////      name: "登录",
//      meta: {
//          istoken: true
//      },
//  },
    {
        path: '/hello',
        component: Hello,
//      component: LayoutA,
//      name: "TEST",
        meta: {
            istoken: true
        },
    },
    {
        path: '/questions',
        component: AppH5Question,
        //component: LayoutA,
        name: " 常见问题",
        meta: {
            istoken: false
        },
    },
    {
        path: '/appAbout',
        component: H5About,
        //component: LayoutA,
        name: "app关于", 
        meta: {
            istoken: true
        },
    },
    {
        path: '/detail/custDetail',
        component: CustDetail,
//      name: "CustDetail",
        meta: {
            istoken: true,
            name: '客户详情'
        }
    },
    {
        path: '/detail/orderDetail',
        component: OrderDetail,
     // name: "订单详情",
        meta: {
            istoken: true,
            name: '订单详情'
        }
    }

]
