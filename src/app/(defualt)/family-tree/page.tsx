'use client';
import React, { useEffect, useRef, useState } from 'react';
import OrgChart from '@balkangraph/orgchart.js';
import * as XLSX from 'xlsx';
import { Select } from 'antd';

interface FamilyMember {
  id: number;
  pid?: number;
  mid?: number;
  name: string;
  title: string;
  dob: string;
  img: string;
  tags?: string;
  side?: string;  // Add side property to identify family side
}

const FamilyTree: React.FC = () => {
  const chartContainer = useRef<HTMLDivElement>(null);
  const [familyData, setFamilyData] = useState<FamilyMember[]>([]);
  const [selectedSide, setSelectedSide] = useState<string>('wife');

  const fetchExcelData = async () => {
    try {
      const response = await fetch(`${selectedSide}.xlsx`);
      const data = await response.arrayBuffer();
      const workbook = XLSX.read(new Uint8Array(data), { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData: FamilyMember[] = XLSX.utils.sheet_to_json(sheet);
      setFamilyData(parsedData);
    } catch (error) {
      console.error('Failed to fetch or parse Excel file:', error);
    }
  };

  useEffect(() => {
    fetchExcelData();
  }, [selectedSide]);

  // Filter family data based on selected side
  const getFilteredFamilyData = () => {
    if (selectedSide === 'wife') {
      return familyData;
    }
    return familyData.filter(member => {
      // If member has a side property, use it for filtering
      if (member.side) {
        return member.side === selectedSide;
      }
      // If no side property, assume both sides are included
      return true;
    });
  };

  useEffect(() => {
    if (chartContainer.current && familyData.length > 0) {
      new OrgChart(chartContainer.current, {
        nodes: getFilteredFamilyData().map((member) => ({
          id: member.id,
          pid: member.pid,
          mid: member.mid,
          name: member.name,
          title: member.title,
          dob: `DOB: ${member.dob}`,
          img: member.img,
          tags: member.tags ? member.tags.split(',') : [],
        })),
        editForm: {
          readOnly: true,
          buttons: {
            pdf: null,
            share: null,
          },
        },
        nodeBinding: {
          field_0: 'name',
          field_1: 'title',
          img_0: 'img',
          field_2: 'dob',
        },
        enableSearch: false,
        template: 'rony', //olivia , ula , belinda , rony ,ana , polina
      });
    }
  }, [familyData, selectedSide]);

  return (
    <div className="w-full h-screen relative  bg-[#E8E8E8]">
      <div className="absolute top-24 z-10 right-12 w-fit h-6">
        <Select
          onChange={(value) => setSelectedSide(value)}
          placeholder="Select family side"
          style={{ width: '100%' }}
        >
          <Select.Option value="wife">Wife&apos;s Side</Select.Option>
          <Select.Option value="husband">Husband&apos;s Side</Select.Option>
        </Select>
      </div>
      <div ref={chartContainer} className="w-full  h-full" />
    </div>
  );
};

export default FamilyTree;
