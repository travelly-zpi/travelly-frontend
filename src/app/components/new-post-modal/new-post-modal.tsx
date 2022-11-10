import "./new-post-modal.scss";

import Modal from "../modal/modal";

import {
  Button,
  Form,
  Image,
  Input,
  Tabs,
  Typography,
  Upload,
} from "antd";

import { useCallback, useState } from "react";
import { UploadOutlined, PlusOutlined } from "@ant-design/icons";
import PostAccommodationForm from "./post-accommodation-form/post-accommodation-form";
import axios from "axios";
import { useTranslation } from "react-i18next";
import _debounce from "lodash/debounce";
import PostCarpoolingForm from "./post-carpooling-form/post-carpooling-form";
import PostExcursionsForm from "./post-excursions-form/post-excursions-form";
import PostTripForm from "./post-trip-form/post-trip-form";
import PostOtherForm from "./post-other-form/post-other-form";

const { Title } = Typography;

interface CreatePostModalProps {
  onClose: Function;
}

const CreatePostModal = ({ onClose }: CreatePostModalProps) => {
  const { i18n, t } = useTranslation();
  const [createPost] = Form.useForm();
  const [locations, setLocations] = useState();
  const [avatarPreview, setAvatarPreview] = useState<string>();

  //location fing function
  const onLocationSearch = (val: string) => {
    if (val) {
      const axiosNoAuth = axios.create();
      delete axiosNoAuth.defaults.headers.common["Authorization"];
      axiosNoAuth.defaults.baseURL = "https://api.mapbox.com/geocoding/v5/";

      axiosNoAuth
        .get(
          `mapbox.places/${val}.json?limit=10&proximity=ip&types=place&language=${
            i18n.language + (i18n.language !== "en" ? ",en" : "")
          }&access_token=${process.env.REACT_APP_MAPBOX_API_KEY}`,
          {}
        )
        .then(({ data }) => {
          const locations = data.features.map((feature: any) => ({
            label: feature.place_name,
            value: feature.place_name_en,
            key: feature.place_name_en,
          }));

          setLocations(locations);
        });
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceOnLocationSearch = useCallback(
    _debounce(onLocationSearch, 400),
    []
  );

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const forms = [
    {
      label: "Accommodation",
      key: "accommodation",
      children: (
        <PostAccommodationForm
          onLocationSearch={debounceOnLocationSearch}
          locations={locations}
        />
      ),
    },
    {
      label: "Carpooling",
      key: "carpooling",
      children: (
        <PostCarpoolingForm
          onLocationSearch={debounceOnLocationSearch}
          locations={locations}
        />
      ),
    },
    {
      label: "Trip together",
      key: "trip-together",
      children: (
        <PostTripForm
          onLocationSearch={debounceOnLocationSearch}
          locations={locations}
        />
      ),
    },
    {
      label: "Excursions",
      key: "excursions",
      children: (
        <PostExcursionsForm
          onLocationSearch={debounceOnLocationSearch}
          locations={locations}
        />
      ),
    },
    {
      label: "Other",
      key: "other",
      children: (
        <PostOtherForm
          onLocationSearch={debounceOnLocationSearch}
          locations={locations}
        />
      ),
    },
  ];

  const handleChange = ({ file }: any) => {
    setAvatarPreview(URL.createObjectURL(file.originFileObj));
  };

  return (
    <div className="fff">
      <Modal onClose={onClose} size="large">
        <div className="create-post-container">
          <Title className="title" level={3}>
            Create new post
          </Title>
          <div className="create-post-form">
            <Tabs items={forms}></Tabs>
            <div className="create-post-avatar">
              <Image src={avatarPreview} width={250} height={150} placeholder />
              <div style={{ maxWidth: "195px" }}>
                <Upload maxCount={1} onChange={handleChange}>
                  <Button icon={<UploadOutlined />}>Upload main image</Button>
                </Upload>
              </div>
              {/* <FormItem>
                <Upload
                  name="avatar"
                  listType="picture-card"
                  className="avatar-uploader"
                  action="/"
                >
                  {uploadButton}
                </Upload>
              </FormItem> */}
            </div>
          </div>
          <Button className="submitButton" type="primary" htmlType="submit">
            Create
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default CreatePostModal;
