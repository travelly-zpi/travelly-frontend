import "./board-page.scss";

import {
  DatePicker,
  Input,
  InputNumber,
  Pagination,
  Select,
  Tabs,
  Typography,
} from "antd";
import { PostPreviewInterface } from "../../interfaces/post-preview.interface";
import Post from "../../components/post/post";
import ClipartNoResults from "../../assets/img/clipart-no-results";
import * as React from "react";
import { useContext, useEffect, useState } from "react";
import LoadingContext from "../../contexts/loading-context";
import axios from "axios";
import UserContext from "../../contexts/user-context";
import { UserOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

const { Search } = Input;
const { Title } = Typography;
const { RangePicker } = DatePicker;

type PostType =
  | "discover"
  | "accommodation"
  | "carpooling"
  | "trip"
  | "excursion"
  | "other";

interface FiltersInterface {
  type: PostType;
  startPoint?: string;
  endPoint?: string;
  activeFrom?: string;
  activeTo?: string;
  participants?: number;
}

const BoardPage = () => {
  const { i18n } = useTranslation();
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(9);
  const [totalPosts, setTotalPosts] = useState(1);
  const [filters, setFilters] = useState<FiltersInterface>({
    type: "discover",
  });
  const [locationsFrom, setLocationsFrom] = useState([]);
  const [locationsTo, setLocationsTo] = useState([]);
  const { setLoading } = useContext(LoadingContext);
  const { user } = useContext(UserContext);

  const loadPosts = (searchQuery?: string) => {
    setLoading(true);

    const params: any = {
      page: page,
      size: pageSize,
      active: true,
      notAuthor: user?.uuid,
    };

    for (const key in filters) {
      const val = filters[key as keyof FiltersInterface];
      if (val && val !== "discover") {
        params[key as keyof FiltersInterface] = val;
      }
    }

    if (searchQuery) {
      params["query"] = searchQuery;
    }

    console.log(params);
    axios
      .get(`/post`, {
        params,
      })
      .then((res) => {
        const data = res.data;
        setPosts(data.posts);
        setTotalPosts(data.count);
      })
      .catch((err) => {
        const msg = err.response?.data?.message;
        console.error(msg);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize, filters]);

  const onTabChange = (key: string) => {
    setFilters({ type: key as PostType });
    setLocationsTo([]);
    setLocationsFrom([]);
    setPage(1);
    setTotalPosts(1);
  };

  const onPaginationChange = (page: number, pageSize: number) => {
    setPage(page);
    setPageSize(pageSize);
  };

  const onLocationSearch = (val: string, fromLocations = true) => {
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

          if (fromLocations) {
            setLocationsFrom(locations);
          } else {
            setLocationsTo(locations);
          }
        });
    }
  };

  const postsDiv =
    posts.length > 0 ? (
      <div className="board-posts">
        <div className="posts-block">
          {posts?.map((post: PostPreviewInterface) => (
            <Post post={post} key={post.uuid} isMyProfile={false}></Post>
          ))}
        </div>

        <Pagination
          current={page}
          onChange={onPaginationChange}
          pageSize={pageSize}
          total={totalPosts}
          showSizeChanger={true}
          pageSizeOptions={[3, 9, 18, 27]}
        />
      </div>
    ) : (
      <div className="board-posts">
        <ClipartNoResults></ClipartNoResults>
        <Title level={3}>No posts found</Title>
      </div>
    );

  const filterDiv = (
    <div className="board-filter">
      {["carpooling", "trip"].includes(filters.type) ? (
        <>
          <div>
            <label>From : </label>
            <Select
              showSearch
              options={locationsFrom}
              onSearch={(val: string) => onLocationSearch(val)}
              placeholder="Please provide start point"
              onSelect={(startPoint: string) =>
                setFilters({ ...filters, startPoint })
              }
              allowClear
            ></Select>
          </div>

          <div>
            <label>To : </label>
            <Select
              showSearch
              options={locationsTo}
              onSearch={(val: string) => onLocationSearch(val, false)}
              placeholder="Please provide destination"
              onSelect={(endPoint: string) =>
                setFilters({ ...filters, endPoint })
              }
              allowClear
            ></Select>
          </div>
        </>
      ) : (
        <Select
          showSearch
          options={locationsFrom}
          onSearch={(val: string) => onLocationSearch(val)}
          placeholder="Please provide location"
          onSelect={(startPoint: string) => {
            setFilters({ ...filters, startPoint });
          }}
          allowClear
        ></Select>
      )}

      {filters.type === "accommodation" && (
        <RangePicker
          name="activeDateRange"
          onChange={(dates: any, dateStrings: Array<string>) => {
            setFilters({
              ...filters,
              activeFrom: dateStrings[0],
              activeTo: dateStrings[1],
            });
          }}
        />
      )}
      {["carpooling", "trip"].includes(filters.type) && (
        <DatePicker
          name="activeFrom"
          onChange={(date: any, dateString: string) => {
            setFilters({ ...filters, activeFrom: dateString });
          }}
        />
      )}
      {["accommodation", "carpooling"].includes(filters.type) && (
        <InputNumber
          addonBefore={<UserOutlined />}
          name="participants"
          onChange={(val: any) => setFilters({ ...filters, participants: val })}
        />
      )}
    </div>
  );

  const tabChildren = (
    <>
      {filterDiv}
      {postsDiv}
    </>
  );

  const tabs = [
    {
      label: "Discover",
      key: "discover",
      children: tabChildren,
    },
    {
      label: "Accommodation",
      key: "accommodation",
      children: tabChildren,
    },
    {
      label: "Carpooling",
      key: "carpooling",
      children: tabChildren,
    },
    {
      label: "Trip together",
      key: "trip",
      children: tabChildren,
    },
    {
      label: "Excursion",
      key: "excursion",
      children: tabChildren,
    },
    {
      label: "Other",
      key: "other",
      children: tabChildren,
    },
  ];

  return (
    <section className="board-page">
      <Search
        placeholder="Start your search"
        onSearch={(query: string) => loadPosts(query)}
        className="board-search"
        size="large"
      />
      <Tabs
        items={tabs}
        onChange={onTabChange}
        centered
        style={{ width: "100%" }}
      />
    </section>
  );
};

export default BoardPage;
