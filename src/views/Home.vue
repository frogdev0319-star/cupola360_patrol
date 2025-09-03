<template>
  <div class="home" v-loading="loading">
    <!-- 表單示範區域 -->
    <el-card class="demo-section" id="form">
      <template #header>
        <h2 style="font-size: 20px">{{ inspectTagName }}</h2>
      </template>

      <div
        class="inspect_item_row"
        v-for="item in inspectDetail"
        :key="item.id"
      >
        <!-- ==== with children ==== -->
        <div v-if="item.type == 0 && item.children">
          <div class="main_title">{{ item.groupName }}</div>
          <div class="l--"></div>
          <div v-for="_children in item.children" :key="_children.id">
            <div class="sub_title">{{ _children.groupName }}</div>
            <div class="inspect_item">
              <div v-for="(_item, index) in _children.items" :key="_item.id">
                <div class="catergy">
                  <div class="catergy_title">
                    <span style="margin-right: 8px">{{ index + 1 }}. </span>
                    <div class="">{{ _item.subject }}</div>
                  </div>
                  <div class="switch_bg">
                    <el-switch
                      v-model="_item.itemScore"
                      style="
                        --el-switch-on-color: #409eff;
                        --el-switch-off-color: #eee;
                        width: 140px;
                      "
                      active-text="合格"
                      inactive-text="不合格"
                    />
                  </div>
                </div>
                <el-input
                  v-model="_item.description"
                  style="
                    width: calc(100% - 20px);
                    margin-left: 20px;
                    margin-bottom: 10px;
                  "
                  :rows="2"
                  type="textarea"
                  placeholder="請輸入巡檢項建議"
                />
                <el-button
                  style="margin-bottom: 10px; margin-left: 20px"
                  type="info"
                  plain
                  @click="sentRequest(_item)"
                  :disabled="_item.images && _item.images.length >= 3"
                  >螢幕截圖</el-button
                >
                <div class="imgscreen" v-show="isShow">
                  <div
                    v-for="(img, idx) in _item.images"
                    :key="idx"
                    class="image-wrapper"
                  >
                    <img
                      :src="img"
                      alt=""
                      width="100%"
                      class="screenshot-image"
                    />
                    <el-button
                      type="danger"
                      size="small"
                      circle
                      class="delete-btn"
                      @click="deleteImage(_item, idx)"
                    >
                      <el-icon size="12"><Close /></el-icon>
                    </el-button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- === !children ===-->
        <div v-else-if="item.type == 0 && !item.children">
          <div class="main_title">{{ item.groupName }}</div>
          <div class="l--"></div>
          <!-- <div class="sub_title">Space</div> -->
          <div class="inspect_item">
            <div v-for="(_item, index) in item.items" :key="_item.id">
              <div class="catergy">
                <div class="catergy_title">
                  <span style="margin-right: 8px">{{ index + 1 }}.</span>
                  <div class="">{{ _item.subject }}</div>
                </div>
                <div class="switch_bg">
                  <el-switch
                    v-model="_item.itemScore"
                    style="
                      --el-switch-on-color: #409eff;
                      --el-switch-off-color: #eee;
                      width: 140px;
                    "
                    active-text="合格"
                    inactive-text="不合格"
                  />
                </div>
              </div>
              <el-input
                v-model="_item.description"
                style="
                  width: calc(100% - 20px);
                  margin-left: 20px;
                  margin-bottom: 10px;
                "
                :rows="2"
                type="textarea"
                placeholder="請輸入巡檢項建議"
              />
              <el-button
                style="margin-bottom: 10px; margin-left: 20px"
                type="info"
                plain
                @click="sentRequest(_item)"
                :disabled="_item.images && _item.images.length >= 3"
                >螢幕截圖</el-button
              >
              <div class="imgscreen" v-show="isShow">
                <div
                  v-for="(img, idx) in _item.images"
                  :key="idx"
                  class="image-wrapper"
                >
                  <img
                    :src="img"
                    alt=""
                    width="100%"
                    class="screenshot-image"
                  />
                  <el-button
                    type="danger"
                    size="small"
                    circle
                    class="delete-btn"
                    @click="deleteImage(_item, idx)"
                  >
                    <el-icon size="12"><Close /></el-icon>
                  </el-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-card>

    <!-- 巡檢總評 -->
    <el-card class="demo-section" id="form">
      <template #header>
        <h2 style="font-size: 20px">巡檢總評</h2>
      </template>
      <el-button type="info" plain>良好</el-button>
      <el-button type="info" plain>待改善</el-button>
      <el-button type="info" plain>立即督導</el-button>
    </el-card>

    <!-- sumit -->
    <el-card class="demo-section">
      <el-button type="primary" size="large" @click="submit"
        >提交報告</el-button
      >
    </el-card>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from "vue";
import { ElMessage } from "element-plus";
import { login, getInspection, submitInspect ,getInspectToken } from "../api/user";
import { Clock, Close } from "@element-plus/icons-vue";

export default {
  name: "Home",
  setup() {
    const selectedOption = ref("option1");
    const isQualified = ref(true);
    const textarea = ref("");
    // 每個 item 各自多圖，不再用全域 showimgSrc
    const showimgSrc = ref([]); // 保留但不再用
    // 暫存目前要 push 圖片的 item id
    let currentItem = null;

    const loading = ref(true);

    let parentUrl = null;

    // // 處理接收到的 message 資料並顯示
    // const handleMessage = (data) => {
    //   console.log('Handling message data:', data);
    //   showimgSrc.value = data;
    // };
    // /// 將事件資料記錄至 console 的 function
    // const logEventData = (event) => {
    //   console.log('Event data:', event.data);
    // };

    // const url = new URL(window.location.href);
    // const token = url.searchParams.get('token');
    // console.log('url :>> ', url);
    // console.log('token ------:>> ', token);

    const inspectDetail = ref([]);

    onMounted(async () => {
      screenShot();
      await init();
    });

    const init = async () => {
      loading.value = true;
      // await userLogin();
      // await getToken();
      
      await getWebUrlToken();
      await getInspectData();
    };

    // const userLogin = async () => {
    //   await login()
    //     .then((res) => {
    //       // 解析 token 並存儲到 localStorage
    //       const tokenMatch = res.url.split("token=");
    //       if (tokenMatch.length > 1) {
    //         const token = tokenMatch[1];
    //         localStorage.setItem("token", token);
    //       }
    //     })
    //     .catch((err) => {
    //       console.error("login error", err);
    //     });
    // };

    const getWebUrlToken = () => {
      const url = new URL(window.location.href);
      const token = url.searchParams.get("token");

      console.log("url :>> ", url);
      console.log("token :>> ", token);


      if(url.hostname == "localhost" && token == null){
        getToken()
      } 
      else {
        localStorage.setItem("token", token);
      }

      
    };

    const testsecret = "testsecret";
    const getToken = async () => {
      await getInspectToken()
        .then((res) => {
          // 解析 token 並存儲到 localStorage
          // console.log('res.data :>> ', res.data);
          if (res) {
            const m = res.data.url.match(/token=([^&]+)/);
            const token = m ? m[1] : null;
            localStorage.setItem("token", token);
          }
          // const tokenMatch = res.url.split('token=')
          // if (tokenMatch.length > 1) {
          //   const token = tokenMatch[1]
          //   localStorage.setItem('token', token)
          // }
        })
        .catch((err) => {
          console.error("login error", err);
        });
    };

    const inspectTagName = ref("");
    const getInspectData = async () => {
      try {
        const inspectionRes = await getInspection();
        inspectTagName.value = inspectionRes.inspectTagName;
        console.log("inspectTagName.value :>> ", inspectTagName.value);

        const filterData = handleInspctionCatergyTree(inspectionRes.groups);

        // 遞迴初始化所有 item.images = []
        function initImages(arr) {
          arr.forEach((group) => {
            if (group.items) {
              group.items.forEach((item) => {
                if (!Array.isArray(item.images)) item.images = [];
              });
            }
            if (group.children) initImages(group.children);
          });
        }
        initImages(filterData);

        // console.log('filterData ::::::::>> ', filterData);
        inspectDetail.value = filterData;
        loading.value = false;
      } catch (err) {
        console.error("getInspection error", err);
        console.error(
          "Error details:",
          err.response ? err.response.data : err.message
        );
      }
    };

    const getRouteByTag = (curTag, data) => {
      const temp = [];
      if (data.length != 0) {
        data.forEach((item) => {
          if (item.tag == curTag) {
            temp.push(item);
          }
        });
      }
      return temp;
    };

    const handleInspctionCatergyTree = (arr, key = "groupId") => {
      let cloneData = JSON.parse(JSON.stringify(arr));
      // console.log('cloneData :>> ', cloneData);
      return cloneData.filter((father) => {
        let branchArr = cloneData.filter(
          (child) => father[key] === child.parentId
        );
        if (branchArr.length > 0) {
          father.children = branchArr;
          father.itemCount = 0;
          branchArr.forEach((item) => (father.itemCount += item.itemCount));
        }

        return father.parentId == -1;
      });
    };

    const isShow = ref(false);

    window.addEventListener("message", (event) => {
      // console.log("父頁面網址:", event);
      if (event.data?.parentUrl) {
        parentUrl = event.data.parentUrl;
        console.log("parentUrl :>> ", parentUrl);
      }
    });

    // 傳入 item 物件
    const sentRequest = (item) => {
      // 檢查是否已達到3張截圖限制
      if (item.images && item.images.length >= 3) {
        ElMessage.warning("每個項目最多只能上傳3張截圖");
        return;
      }

      currentItem = item;
      // isShow.value = true
      // console.log('isShow.value :>> ', isShow.value);

      // 僅傳送到父頁面的來源（若可取得）
      let targetOrigin = "*";
      try {
        if (parentUrl) {
          targetOrigin = new URL(parentUrl).origin;
        }
      } catch (e) {
        // ignore parse error, fallback to '*'
      }

      window.parent.postMessage(
        { type: "greeting", data: "https://demo-factory.cupola360.com/" },
        targetOrigin
      );
    };

    const screenShot = () => {
      isShow.value = true;
      window.addEventListener(
        "message",
        function (event) {
          // console.log('event :>> ', event)

          // 僅接受可信來源（與父頁相同的 origin 若可判斷）
          try {
            if (document.referrer) {
              // console.log("document.referrer :>> ", document.referrer);
              const parentOrigin = new URL(document.referrer).origin;
              if (event.origin !== parentOrigin) return;
            }
          } catch (e) {
            // 若無法判斷，放行但仍只處理預期資料格式
          }

          // 支援 { imgSrc: '...' } 或直接字串
          if (event && event.data) {
            // 多圖 push到對應 item
            const img =
              typeof event.data === "string"
                ? event.data
                : event.data.imgSrc || "";
            if (img && currentItem) {
              if (!Array.isArray(currentItem.images)) currentItem.images = [];
              currentItem.images.push(img);
            }
          }
          // console.log('showimgSrc.value :>> ',  showimgSrc.value)
          // console.log('showimgSrc.value :>> ', showimgSrc.value);
          // // 檢查訊息來源，確保只處理來自信任來源的訊息
          // if (event.origin === 'http://www.frogdeng.com' ) {
          //   console.log('event.data :>> ', event.data);
          //   showimgSrc.value = event.data;
          // } else {
          //   // console.log('Received message from untrusted origin:', event.origin);
          // }
        },
        false
      );
    };

    // 刪除指定項目的指定索引的圖片
    const deleteImage = (item, index) => {
      if (item.images && item.images.length > index) {
        item.images.splice(index, 1);
        ElMessage.success("圖片已刪除");
      }
    };

    const  submit = async () => {
      var tempSubmitItem = [];
      inspectDetail.value.forEach((i) => {
        if (i.children) {
          i.children.forEach((ii) => {
            ii.items.forEach((_items) => {
              var i_temp = {};
              _items.itemScore = _items.itemScore == true ? 1 : 0;

              i_temp.ts = Date.parse(new Date());
              i_temp.grade = _items.itemScore;
              i_temp.description = _items.description;
              i_temp.storeId = "KjRcBMbWKWms";
              i_temp.inspectItemId = _items.id;
              i_temp.attachment = [
                {
                  ts: Date.parse(new Date()),
                  mediaType: 2,
                  url: "https://storevuestorage.blob.core.windows.net/storevue-mgmt-portals/image/20250903/inspect_101603440_9TAfZa3K2E3t_48570_0.jpg",
                  deviceId: -1
                }
              ]

              tempSubmitItem.push(i_temp);
            });
          });
        } else {
          i.items.forEach((_items) => {
            var i_temp = {};
            _items.itemScore = _items.itemScore == true ? 1 : 0;

            i_temp.ts = Date.parse(new Date());
            i_temp.grade = _items.itemScore;
            i_temp.description = _items.description;
            i_temp.storeId = "KjRcBMbWKWms";
            i_temp.inspectItemId = _items.id;

            tempSubmitItem.push(i_temp);
          });
        }
      });

      var params = {
        status: 2,
        comment: "",
        reportScore: 16,
        // uuid: "d3cXjRypQZsrhsGL",
        weatherType: 100,
        execute_sign_distance: -1,
        isMysteryMode: false,
        items: tempSubmitItem,

      }


      await submitInspect(params)
      .then((res) => {
        console.log('res :>> ', res);
      })
      .catch((err) => {
        console.error("login error", err);
      });


      console.log("tempSubmitItem :>> ", tempSubmitItem);
      console.log("submit inspectDetail :>> ", inspectDetail.value);
    };

    return {
      selectedOption,
      textarea,
      isQualified,
      showimgSrc,
      isShow,
      inspectDetail,
      inspectTagName,
      loading,

      screenShot,
      getRouteByTag,
      handleInspctionCatergyTree,
      sentRequest,
      deleteImage,
      submit,
    };
  },
};
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

// 圖片容器和刪除按鈕的樣式
.imgscreen
  margin-left: 20px
  margin-bottom: 30px
  .image-wrapper
    position: relative
    display: inline-block
    width: 30%

    margin-right: 10px
    margin-bottom: 8px

.screenshot-image
  display: block
  border-radius: 4px
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1)

.delete-btn
  position: absolute
  top: 5px
  right: 5px
  width: 24px !important
  height: 24px !important
  padding: 0 !important
  border-radius: 50%
  background-color: #f56c6c
  border: 2px solid #ffffff
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2)
  z-index: 10

  &:hover
    background-color: #f78989
    transform: scale(1.1)
    transition: all 0.2s ease

  .el-icon
    margin: 0

  .screenshot_btn
    margin-bottom: 30px
</style>
