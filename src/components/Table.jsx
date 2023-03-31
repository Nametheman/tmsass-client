import { Space } from "antd";

export const bulkvend = [
  {
    title: "S/N",
    render: (_, record, index) => <b>{index + 1}</b>,
  },
  {
    title: "Phone Number",
    dataIndex: "meta",
    key: "meta",
    render: (_, record) => <Space>{record?.phoneNumber}</Space>,
  },
  {
    title: "Network",
    dataIndex: "description",
    key: "description",
    render: (_, record) => <Space>{record?.network}</Space>,
  },
  {
    title: "Amount",
    dataIndex: "description",
    key: "description",
    render: (_, record) => <Space>{record?.amount}</Space>,
  },
];
