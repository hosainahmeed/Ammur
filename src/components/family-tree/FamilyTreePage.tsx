'use client';

import { useEffect, useRef, useState } from 'react';
import FamilyMemberCard from './FamilyMemberCard';
import { familyData } from '@/lib/familyTreeData';
import { FamilyTree } from '@/lib/types';

export default function FamilyTreePage() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [dimensions, setDimensions] = useState({ width: 1200, height: 800 });

  const calculatePositions = () => {
    const cardWidth = 120;
    const cardHeight = 150;
    const horizontalGap = 20;
    const verticalGap = 100;

    const generations = familyData.reduce((acc, member) => {
      if (!acc[member.generation]) {
        acc[member.generation] = [];
      }
      acc[member.generation].push(member);
      return acc;
    }, {} as Record<number, FamilyTree[]>);

    Object.keys(generations).forEach((gen) => {
      generations[Number(gen)].sort((a, b) => a.position - b.position);
    });

    const genWidths: Record<number, number> = {};
    Object.keys(generations).forEach((gen) => {
      const numMembers = generations[Number(gen)].length;
      genWidths[Number(gen)] =
        numMembers * cardWidth + (numMembers - 1) * horizontalGap;
    });

    const positions: Record<string, { x: number; y: number }> = {};

    Object.keys(generations).forEach((genStr) => {
      const gen = Number(genStr);
      const members = generations[gen];
      const totalWidth = genWidths[gen];
      const startX = (dimensions.width - totalWidth) / 2;

      members.forEach((member, index) => {
        const x = startX + index * (cardWidth + horizontalGap);
        const y = (gen - 1) * (cardHeight + verticalGap) + 50;
        positions[member.id] = { x, y };
      });
    });

    return positions;
  };

  const calculateConnections = (
    positions: Record<string, { x: number; y: number }>
  ) => {
    const connections: {
      from: { x: number; y: number };
      to: { x: number; y: number };
      type: string;
    }[] = [];

    familyData.forEach((member) => {
      if (member.parentIds && member.parentIds.length > 0) {
        const parentId = member.parentIds[0];
        const parent = positions[parentId];
        const child = positions[member.id];

        if (parent && child) {
          connections.push({
            from: { x: parent.x + 60, y: parent.y + 150 },
            to: { x: child.x + 60, y: child.y },
            type: 'parent-child',
          });
        }
      }
    });

    for (let i = 0; i < familyData.length - 1; i++) {
      const current = familyData[i];
      const next = familyData[i + 1];

      if (
        current.generation === next.generation &&
        current.position + 1 === next.position &&
        current.spouseId === next.id
      ) {
        const spouse1 = positions[current.id];
        const spouse2 = positions[next.id];

        if (spouse1 && spouse2) {
          connections.push({
            from: { x: spouse1.x + 120, y: spouse1.y + 75 },
            to: { x: spouse2.x, y: spouse2.y + 75 },
            type: 'spouse',
          });
        }
      }
    }

    const firstGen = familyData.filter((m) => m.generation === 1);
    if (firstGen.length >= 2) {
      const spouse1 = positions[firstGen[0].id];
      const spouse2 = positions[firstGen[1].id];

      if (spouse1 && spouse2) {
        connections.push({
          from: { x: spouse1.x + 120, y: spouse1.y + 75 },
          to: { x: spouse2.x, y: spouse2.y + 75 },
          type: 'spouse',
        });
      }
    }

    return connections;
  };

  useEffect(() => {
    const handleResize = () => {
      const container = document.querySelector('.family-tree-container');
      if (container) {
        setDimensions({
          width: Math.max(container.clientWidth, 1200),
          height: Math.max(container.clientHeight, 800),
        });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const positions = calculatePositions();
  const connections = calculateConnections(positions);

  return (
    <div className="family-tree-container relative w-full">
      <h2 className="text-xl font-semibold text-blue-600 text-center mb-4">
        Family tree of the &quot;Johnson family&quot;
      </h2>

      <div
        className="relative"
        style={{ width: dimensions.width, height: dimensions.height }}
      >
        {/* SVG for connections */}
        <svg
          ref={svgRef}
          width={dimensions.width}
          height={dimensions.height}
          className="absolute top-0 left-0 z-0"
        >
          {/* Draw vertical connections from parents to children */}
          {connections.map((conn, i) => {
            if (conn.type === 'parent-child') {
              const midY = (conn.from.y + conn.to.y) / 2;

              return (
                <path
                  key={`conn-${i}`}
                  d={`M ${conn.from.x} ${conn.from.y} 
                     L ${conn.from.x} ${midY} 
                     L ${conn.to.x} ${midY} 
                     L ${conn.to.x} ${conn.to.y}`}
                  stroke="#999"
                  strokeWidth="2"
                  fill="none"
                />
              );
            } else if (conn.type === 'spouse') {
              return (
                <line
                  key={`conn-${i}`}
                  x1={conn.from.x}
                  y1={conn.from.y}
                  x2={conn.to.x}
                  y2={conn.to.y}
                  stroke="#999"
                  strokeWidth="2"
                />
              );
            }
            return null;
          })}
        </svg>

        {/* Family member cards */}
        {familyData.map((member) => (
          <div
            key={member.id}
            className="absolute"
            style={{
              left: positions[member.id]?.x,
              top: positions[member.id]?.y,
              width: 120,
              height: 150,
              zIndex: 1,
            }}
          >
            <FamilyMemberCard member={member} />
          </div>
        ))}
      </div>
    </div>
  );
}
