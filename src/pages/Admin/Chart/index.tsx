import UpdateModal from '@/pages/Admin/Chart/components/UpdateModal';
import { deleteChartUsingPost, listChartByPageUsingPost } from '@/services/backend/chartController';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import '@umijs/max';
import { message, Space, Typography } from 'antd';
import React, { useRef, useState } from 'react';

/**
 * 图表管理页面
 *
 * @constructor
 */
const ChartAdminPage: React.FC = () => {
  const [updateModalVisible, setUpdateModalVisible] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.Chart>();

  const handleDelete = async (row: API.Chart) => {
    const hide = message.loading('正在删除');
    if (!row) return true;
    try {
      await deleteChartUsingPost({
        id: row.id as any,
      });
      hide();
      message.success('删除成功');
      actionRef?.current?.reload();
      return true;
    } catch (error: any) {
      hide();
      message.error('删除失败，' + error.message);
      return false;
    }
  };

  const columns: ProColumns<API.Chart>[] = [
    {
      title: 'id',
      dataIndex: 'id',
      valueType: 'text',
      hideInForm: true,
    },
    {
      title: '图表名称',
      dataIndex: 'name',
      valueType: 'text',
      ellipsis: true,
    },
    {
      title: '分析目标',
      dataIndex: 'goal',
      valueType: 'text',
      ellipsis: true,
    },
    {
      title: '图表类型',
      dataIndex: 'chartType',
      valueEnum: {
        折线图: { text: '折线图' },
        柱状图: { text: '柱状图' },
        堆叠图: { text: '堆叠图' },
        饼图: { text: '饼图' },
        雷达图: { text: '雷达图' },
      },
    },
    {
      title: '图表配置',
      dataIndex: 'genChart',
      valueType: 'text',
      ellipsis: true,
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: '生成结果',
      dataIndex: 'genResult',
      valueType: 'text',
      ellipsis: true,
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <Space size="middle">
          <Typography.Link
            onClick={() => {
              setCurrentRow(record);
              setUpdateModalVisible(true);
            }}
          >
            修改
          </Typography.Link>
          <Typography.Link type="danger" onClick={() => handleDelete(record)}>
            删除
          </Typography.Link>
        </Space>
      ),
    },
  ];

  return (
    <PageContainer>
      <ProTable<API.Chart>
        headerTitle={'图表管理'}
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        request={async (params, sort, filter) => {
          const sortField = Object.keys(sort)?.[0];
          const sortOrder = sort?.[sortField] ?? undefined;

          const { data, code } = await listChartByPageUsingPost({
            ...params,
            sortField,
            sortOrder,
            ...filter,
          } as API.ChartQueryRequest);

          return {
            success: code === 0,
            data: data?.records || [],
            total: Number(data?.total) || 0,
          };
        }}
        columns={columns}
      />
      <UpdateModal
        visible={updateModalVisible}
        columns={columns}
        oldData={currentRow}
        onSubmit={() => {
          setUpdateModalVisible(false);
          setCurrentRow(undefined);
          actionRef.current?.reload();
        }}
        onCancel={() => {
          setUpdateModalVisible(false);
        }}
      />
    </PageContainer>
  );
};
export default ChartAdminPage;
