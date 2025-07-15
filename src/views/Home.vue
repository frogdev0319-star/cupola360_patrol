<template>
  <div class="home">
    <!-- 表單示範區域 -->
    <el-card class="demo-section" id="form">
      <template #header>
        <h2 style="font-size: 20px;">{{ inspectionData[0].tag }}</h2>
      </template>

      <div class="inspect_item_row" v-for="item in inspectDetail">
        <!-- ==== with children ==== -->
        <div v-if="item.type == 0 && item.children">
            <div class="main_title"> {{ item.groupName }}</div>
            <div class="l--"></div>
            <div v-for="_children in item.children">
              <div class="sub_title">{{_children.groupName}}</div>
              <div class="inspect_item" > 
                <div v-for=" (_item , index) in _children.items">
                  <div class="catergy">
                    <div class="catergy_title">
                      <span style="margin-right: 8px;">{{ index + 1 }}. </span>
                      <div class=""> {{_item.subject}} </div>
                    </div>
                    <div class="switch_bg">
                    <el-switch
                      v-model="isQualified"
                      style="--el-switch-on-color: #409eff; --el-switch-off-color: #eee ; width: 130px;"
                      active-text="合格"
                      inactive-text="不合格"
                    />
                    </div>
                  </div>
                  <el-input
                    v-model="textarea"
                    style="width:calc(100% - 20px) ; margin-left: 20px; margin-bottom: 25px;"
                    :rows="2"
                    type="textarea"
                    placeholder="請輸入巡檢項建議"
                    @change="commentInfo(groupId)"
                  />
                </div>
              </div>
            </div>
        </div>
        <!-- === !children ===-->
        <div v-else-if="item.type == 0 && !item.children">
            <div class="main_title"> {{ item.groupName }}</div>
            <div class="l--"></div>
            <!-- <div class="sub_title">Space</div> -->
            <div class="inspect_item" > 
              <div v-for="(_item , index) in item.items">
                <div class="catergy">
                  <div class="catergy_title">
                    <span style="margin-right: 8px;">{{ index + 1 }}.</span>
                    <div class=""> {{_item.subject}} </div>
                  </div>
                  <div class="switch_bg">
                  <el-switch
                    v-model="isQualified"
                    style="--el-switch-on-color: #409eff; --el-switch-off-color: #eee ; width: 130px;"
                    active-text="合格"
                    inactive-text="不合格"
                  />
                  </div>
                </div>
                <el-input
                  v-model="textarea"
                  style="width:calc(100% - 20px) ; margin-left: 20px; margin-bottom: 25px;"
                  :rows="2"
                  type="textarea"
                  placeholder="請輸入巡檢項建議"
                />
              </div>
            </div>
        </div>
      </div>
    </el-card>

    <!-- 巡檢總評 -->
    <el-card class="demo-section" id="form">
      <template #header>
        <h2 style="font-size: 20px;">巡檢總評</h2>
      </template>
      <el-button type="info"  plain>良好</el-button>
      <el-button type="info"  plain>待改善</el-button>
      <el-button type="info"  plain>立即督導</el-button>
    </el-card>

    <!-- screenshot -->
    <el-card class="demo-section" id="form">
      <template #header>
        <h2 style="font-size: 20px;">螢幕截圖</h2>
      </template>
      <el-button type="info" plain @click="showImg()">螢幕截圖</el-button>

      <br>
      <br>
      <div class="" v-show="isShow">
        <img :src="showimgSrc.imgSrc " alt="">
      </div>

    </el-card>

    <el-card class="demo-section" >
      <el-button type="primary" size="large">提交報告</el-button>
    </el-card>
    


  </div>
</template>

<script>
import { ref, reactive , onMounted} from 'vue'
import { ElMessage } from 'element-plus'
import { submitFormData } from '../api/data'
import { login, getInspection } from '../api/user'

export default {
  name: 'Home',
  setup() {
    const selectedOption = ref('option1')
    const isQualified = ref(true)
    const textarea = ref('')
    const showimgSrc = ref('');


    

    // // 處理接收到的 message 資料並顯示
    // const handleMessage = (data) => {
    //   console.log('Handling message data:', data);
    //   showimgSrc.value = data;
    // };
    // /// 將事件資料記錄至 console 的 function
    // const logEventData = (event) => {
    //   console.log('Event data:', event.data);
    // };

    const inspectionData = [
    {
        "id": 16703,
        "mode": 1,
        "name": "Warehouse Checklist",
        "type": 0,
        "tag": "Linkou warehouse inspection",
        "parentId": -1,
        "sequence": 16703,
        "items": [],
        "weight": -1,
        "groupScore": -99999,
        "isAdvanced": false,
        "children": [
            {
                "id": 16704,
                "mode": 1,
                "name": "Space",
                "type": 0,
                "tag": "Linkou warehouse inspection",
                "parentId": 16703,
                "sequence": 16704,
                "items": [
                    {
                        "id": 48237,
                        "subject": "Available storage capacity for expansion",
                        "description": "",
                        "itemScore": 10,
                        "qualifiedScore": 0,
                        "sequence": 48237,
                        "type": 0,
                        "availableScores": [],
                        "attachments": [],
                        "required": false,
                        "memo_is_advanced": false,
                        "memo_options": [],
                        "memo_config": null,
                        "isImportant": false
                    },
                    {
                        "id": 48238,
                        "subject": "Evaluate space usage to avoid waste",
                        "description": "",
                        "itemScore": 10,
                        "qualifiedScore": 0,
                        "sequence": 48238,
                        "type": 0,
                        "availableScores": [],
                        "attachments": [],
                        "required": false,
                        "memo_is_advanced": false,
                        "memo_options": [],
                        "memo_config": null,
                        "isImportant": false
                    },
                    {
                        "id": 48239,
                        "subject": "Clear segments of warehouse space usage",
                        "description": "",
                        "itemScore": 10,
                        "qualifiedScore": 0,
                        "sequence": 48239,
                        "type": 0,
                        "availableScores": [],
                        "attachments": [],
                        "required": false,
                        "memo_is_advanced": false,
                        "memo_options": [],
                        "memo_config": null,
                        "isImportant": false
                    }
                ],
                "weight": -1,
                "groupScore": -99999,
                "isAdvanced": false
            },
            {
                "id": 16705,
                "mode": 1,
                "name": "Stock Items",
                "type": 0,
                "tag": "Linkou warehouse inspection",
                "parentId": 16703,
                "sequence": 16705,
                "items": [
                    {
                        "id": 48240,
                        "subject": "Put stock items in correct locations",
                        "description": "",
                        "itemScore": 10,
                        "qualifiedScore": 0,
                        "sequence": 48240,
                        "type": 0,
                        "availableScores": [],
                        "attachments": [],
                        "required": false,
                        "memo_is_advanced": false,
                        "memo_options": [],
                        "memo_config": null,
                        "isImportant": false
                    },
                    {
                        "id": 48241,
                        "subject": "No outdated items in storage area",
                        "description": "",
                        "itemScore": 10,
                        "qualifiedScore": 0,
                        "sequence": 48241,
                        "type": 0,
                        "availableScores": [],
                        "attachments": [],
                        "required": false,
                        "memo_is_advanced": false,
                        "memo_options": [],
                        "memo_config": null,
                        "isImportant": false
                    },
                    {
                        "id": 48242,
                        "subject": "Packaging process complies with the SOP regulations",
                        "description": "",
                        "itemScore": 10,
                        "qualifiedScore": 0,
                        "sequence": 48242,
                        "type": 0,
                        "availableScores": [],
                        "attachments": [],
                        "required": false,
                        "memo_is_advanced": false,
                        "memo_options": [],
                        "memo_config": null,
                        "isImportant": false
                    },
                    {
                        "id": 48243,
                        "subject": "Storage process complies with the SOP regulations",
                        "description": "",
                        "itemScore": 10,
                        "qualifiedScore": 0,
                        "sequence": 48243,
                        "type": 0,
                        "availableScores": [],
                        "attachments": [],
                        "required": false,
                        "memo_is_advanced": false,
                        "memo_options": [],
                        "memo_config": null,
                        "isImportant": false
                    }
                ],
                "weight": -1,
                "groupScore": -99999,
                "isAdvanced": false
            },
            {
                "id": 16706,
                "mode": 1,
                "name": "Counting",
                "type": 0,
                "tag": "Linkou warehouse inspection",
                "parentId": 16703,
                "sequence": 16706,
                "items": [
                    {
                        "id": 48244,
                        "subject": "Every item is tagged with a part number",
                        "description": "",
                        "itemScore": 10,
                        "qualifiedScore": 0,
                        "sequence": 48244,
                        "type": 0,
                        "availableScores": [],
                        "attachments": [],
                        "required": false,
                        "memo_is_advanced": false,
                        "memo_options": [],
                        "memo_config": null,
                        "isImportant": false
                    },
                    {
                        "id": 48245,
                        "subject": "Mark how many items in a sealed package",
                        "description": "",
                        "itemScore": 10,
                        "qualifiedScore": 0,
                        "sequence": 48245,
                        "type": 0,
                        "availableScores": [],
                        "attachments": [],
                        "required": false,
                        "memo_is_advanced": false,
                        "memo_options": [],
                        "memo_config": null,
                        "isImportant": false
                    },
                    {
                        "id": 48246,
                        "subject": "Special tag is recorded and monitored",
                        "description": "",
                        "itemScore": 10,
                        "qualifiedScore": 0,
                        "sequence": 48246,
                        "type": 0,
                        "availableScores": [],
                        "attachments": [],
                        "required": false,
                        "memo_is_advanced": false,
                        "memo_options": [],
                        "memo_config": null,
                        "isImportant": false
                    }
                ],
                "weight": -1,
                "groupScore": -99999,
                "isAdvanced": false
            },
            {
                "id": 16707,
                "mode": 1,
                "name": "Safety & Security.",
                "type": 0,
                "tag": "Linkou warehouse inspection",
                "parentId": 16703,
                "sequence": 16707,
                "items": [
                    {
                        "id": 48247,
                        "subject": "Provide and maintain appropriate environmental conditions (air conditioning, humidity, and temperature).",
                        "description": "",
                        "itemScore": 10,
                        "qualifiedScore": 0,
                        "sequence": 48247,
                        "type": 0,
                        "availableScores": [],
                        "attachments": [],
                        "required": false,
                        "memo_is_advanced": false,
                        "memo_options": [],
                        "memo_config": null,
                        "isImportant": false
                    },
                    {
                        "id": 48248,
                        "subject": "Ensure that all storage areas are provided with fire safety and security systems.",
                        "description": "",
                        "itemScore": 10,
                        "qualifiedScore": 0,
                        "sequence": 48248,
                        "type": 0,
                        "availableScores": [],
                        "attachments": [],
                        "required": false,
                        "memo_is_advanced": false,
                        "memo_options": [],
                        "memo_config": null,
                        "isImportant": false
                    },
                    {
                        "id": 48249,
                        "subject": "Install and regularly test intruder alarm systems.",
                        "description": "",
                        "itemScore": 10,
                        "qualifiedScore": 0,
                        "sequence": 48249,
                        "type": 0,
                        "availableScores": [],
                        "attachments": [],
                        "required": false,
                        "memo_is_advanced": false,
                        "memo_options": [],
                        "memo_config": null,
                        "isImportant": false
                    }
                ],
                "weight": -1,
                "groupScore": -99999,
                "isAdvanced": false
            }
        ],
        "itemCount": null
    },
    {
        "id": 16708,
        "mode": 1,
        "name": "FOLLOW-UP",
        "type": 2,
        "tag": "Linkou warehouse inspection",
        "parentId": -1,
        "sequence": 16708,
        "items": [],
        "weight": -1,
        "groupScore": -99999,
        "isAdvanced": false,
        "children": [
            {
                "id": 16709,
                "mode": 1,
                "name": "FOLLOW-UP",
                "type": 2,
                "tag": "Linkou warehouse inspection",
                "parentId": 16708,
                "sequence": 16709,
                "items": [
                    {
                        "id": 48250,
                        "subject": "Have the hazards that were identified last month been corrected? (If “NO”, specify which hazards by adding a note)",
                        "description": "",
                        "itemScore": -10,
                        "qualifiedScore": 0,
                        "sequence": 48250,
                        "type": 0,
                        "availableScores": [],
                        "attachments": [],
                        "required": false,
                        "memo_is_advanced": false,
                        "memo_options": [],
                        "memo_config": null,
                        "isImportant": false
                    },
                    {
                        "id": 48251,
                        "subject": "Have maintenance-related items been reported, called in or entered on the restaurant computer?",
                        "description": "",
                        "itemScore": -10,
                        "qualifiedScore": 0,
                        "sequence": 48251,
                        "type": 0,
                        "availableScores": [],
                        "attachments": [],
                        "required": false,
                        "memo_is_advanced": false,
                        "memo_options": [],
                        "memo_config": null,
                        "isImportant": false
                    },
                    {
                        "id": 48252,
                        "subject": "Have unsafe practices been addressed with all employees?",
                        "description": "",
                        "itemScore": -10,
                        "qualifiedScore": 0,
                        "sequence": 48252,
                        "type": 0,
                        "availableScores": [],
                        "attachments": [],
                        "required": false,
                        "memo_is_advanced": false,
                        "memo_options": [],
                        "memo_config": null,
                        "isImportant": false
                    }
                ],
                "weight": -1,
                "groupScore": -99999,
                "isAdvanced": false
            }
        ],
        "itemCount": null
    },
    {
        "id": 16710,
        "mode": 1,
        "name": "AAA",
        "type": 0,
        "tag": "Linkou warehouse inspection",
        "parentId": -1,
        "sequence": 16710,
        "items": [
            {
                "id": 48253,
                "subject": "aaa1",
                "description": "",
                "itemScore": 10,
                "qualifiedScore": 0,
                "sequence": 48253,
                "type": 0,
                "availableScores": [],
                "attachments": [],
                "required": false,
                "memo_is_advanced": false,
                "memo_options": [],
                "memo_config": {
                    "memo_check_media": false,
                    "memo_required_type": 0,
                    "memo_check_text": false
                },
                "isImportant": false
            },
            {
                "id": 48254,
                "subject": "aaa2",
                "description": "",
                "itemScore": 10,
                "qualifiedScore": 0,
                "sequence": 48254,
                "type": 0,
                "availableScores": [],
                "attachments": [],
                "required": false,
                "memo_is_advanced": false,
                "memo_options": [],
                "memo_config": {
                    "memo_check_media": false,
                    "memo_required_type": 0,
                    "memo_check_text": false
                },
                "isImportant": false
            }
        ],
        "weight": -1,
        "groupScore": -99999,
        "isAdvanced": false
    },
    {
        "id": 16711,
        "mode": 1,
        "name": "BBB",
        "type": 0,
        "tag": "Linkou warehouse inspection",
        "parentId": -1,
        "sequence": 16711,
        "items": [
            {
                "id": 48255,
                "subject": "bbb1",
                "description": "",
                "itemScore": 10,
                "qualifiedScore": 0,
                "sequence": 48255,
                "type": 0,
                "availableScores": [],
                "attachments": [],
                "required": false,
                "memo_is_advanced": false,
                "memo_options": [],
                "memo_config": {
                    "memo_check_media": false,
                    "memo_required_type": 0,
                    "memo_check_text": false
                },
                "isImportant": false
            },
            {
                "id": 48256,
                "subject": "bbb2",
                "description": "",
                "itemScore": 10,
                "qualifiedScore": 0,
                "sequence": 48256,
                "type": 0,
                "availableScores": [],
                "attachments": [],
                "required": false,
                "memo_is_advanced": false,
                "memo_options": [],
                "memo_config": {
                    "memo_check_media": false,
                    "memo_required_type": 0,
                    "memo_check_text": false
                },
                "isImportant": false
            }
        ],
        "weight": -1,
        "groupScore": -99999,
        "isAdvanced": false
    }
    ]

    const inspectDetail = ref([])
  

    const getRouteByTag = (curTag, data) =>{
      console.log('data !!!!:>> ', data);
      console.log('curTag :>> ', curTag);
      const temp = [];
      if (data.length != 0) {
        data.forEach(item => {
          if (item.tag == curTag) {
            temp.push(item);
          }
        });
      }
      return temp;
    }

    const handleInspctionCatergyTree = (arr, key='groupId') =>{
      let cloneData = JSON.parse(JSON.stringify(arr));
      console.log('cloneData :>> ', cloneData);
      return cloneData.filter(father => {
        let branchArr = cloneData.filter(child => father[key] === child.parentId);
        if (branchArr.length > 0){
          father.children = branchArr;
          father.itemCount = 0;
          branchArr.forEach(item => father.itemCount += item.itemCount)
        }
        
        return father.parentId == -1;
      })
    }

    // const form = reactive({
    //   name: '',
    //   email: '',
    //   city: ''
    // })
    // const resetForm = () => {
    //   form.name = ''
    //   form.email = ''
    //   form.city = ''
    //   ElMessage.info('表單已重置')
    // }
    // const submitForm = async () => {
    //   try {
    //     await submitFormData(form)
    //     ElMessage.success('表單提交成功！')
    //     resetForm()
    //   } catch (error) {
    //     console.error('提交表單失敗:', error)
    //   }
    // }

    const isShow = ref(false)
    const showImg = ()=>{
      isShow.value = true
      console.log('isShow.value :>> ', isShow.value);
    }


    const screenShot = () =>{
      window.addEventListener('message', function(event) {

        showimgSrc.value = event.data;

        // // 檢查訊息來源，確保只處理來自信任來源的訊息
        // if (event.origin === 'http://www.frogdeng.com' ) {
        //   console.log('event.data :>> ', event.data);
        //   showimgSrc.value = event.data;
        // } else {
        //   // console.log('Received message from untrusted origin:', event.origin);
        // }
      }, false);
    }


    const commentInfo = (id)=>{
      console.log("id" , id)
    }

    onMounted(() => {
      login().then(res => {
        // 解析 token 並存儲到 localStorage
        const tokenMatch = res.url.split('token=')
        if (tokenMatch.length > 1) {
          const token = tokenMatch[1]
          localStorage.setItem('token', token)
        }
      }).catch(err => {
        console.error('login error', err)
      });


      getInspection().then(res => {
          console.log('getInspection res groups:>> ', res.groups);
          res.groups

          // const curTag = "Linkou warehouse inspection"
          // const data = getRouteByTag(curTag, res.groups);
          // console.log('data :>> ', data);
          const filterData = handleInspctionCatergyTree(res.groups);
          console.log('filterData ::::::::>> ', filterData);
          inspectDetail.value = filterData
        }).catch(err => {
      });

      screenShot();
    });

    return {
      selectedOption,
      textarea,
      // form,
      // submitForm,
      // resetForm,
      isQualified,
      inspectionData,
      showimgSrc,
      isShow,
      inspectDetail,

      screenShot,
      getRouteByTag,
      handleInspctionCatergyTree,
      showImg,
      commentInfo
      

    }

      
  }

  
}
</script>

<style lang="sass" scoped>
.home
  padding: 20px

.form-select
  margin-bottom: 20px
  width: 100%

.demo-section
  margin-bottom: 30px

.inspect_item_row
  padding: 10px
  .l--
    height: 1px
    margin: 15px 0
    background: #eee
  .main_title
    font-size: 18px
    color: #7d8cad
    border-left: 5px solid #409eff
    padding-left: 10px
  .sub_title
    font-size: 16px
    color: #7d8cad
    margin-bottom: 10px
  .inspect_item
    margin-bottom: 20px
    background: #f8f8f8
    padding: 20px 10px
    border-radius: 2px
    .catergy
      display: flex
      flex-direction: row
      justify-content: space-between
      align-items: flex-start
      margin-bottom: 10px
      .switch_bg
        background: #e4f3ff
        padding: 1px 25px
        border-radius: 100px
      .catergy_title
        width: 80%
        // font-weight: bold
        display: flex
        flex-direction: row
        justify-content: flex-start
        align-items: flex-start
        font-size: 15px
        color: #555
        line-height: 1.5
</style>
