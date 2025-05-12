'use client';
import React, { useEffect, useRef, useState } from 'react';
import OrgChart from '@balkangraph/orgchart.js';
import * as XLSX from 'xlsx';

interface FamilyMember {
  id: number;
  pid?: number;
  mid?: number;
  name: string;
  title: string;
  dob: string;
  img: string;
  tags?: string;
}

const FamilyTree: React.FC = () => {
  const chartContainer = useRef<HTMLDivElement>(null);
  const [familyData, setFamilyData] = useState<FamilyMember[]>([]);

  const fetchExcelData = async () => {
    try {
      const response = await fetch('/FamilyTreeTemplate.xlsx');
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
  }, []);

  useEffect(() => {
    if (chartContainer.current && familyData.length > 0) {
      new OrgChart(chartContainer.current, {
        nodes: familyData.map((member) => ({
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
  }, [familyData]);

  return (
    <div className="w-full h-screen  bg-[#E8E8E8]">
      <div ref={chartContainer} className="w-full  h-full" />
    </div>
  );
};

export default FamilyTree;
