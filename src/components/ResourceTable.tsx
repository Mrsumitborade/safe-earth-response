
import React from 'react';
import { Resource } from '@/data/dummyData';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface ResourceTableProps {
  resources: Resource[];
  onRequestResource?: (resource: Resource) => void;
}

const ResourceTable = ({ resources, onRequestResource }: ResourceTableProps) => {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Type</TableHead>
            <TableHead className="text-right">Available</TableHead>
            <TableHead className="text-right">Allocated</TableHead>
            <TableHead className="hidden sm:table-cell">Location</TableHead>
            <TableHead className="hidden sm:table-cell">Last Updated</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {resources.map((resource) => (
            <TableRow key={resource.id}>
              <TableCell className="font-medium">{resource.type}</TableCell>
              <TableCell className="text-right">
                {resource.available}
                {resource.available < 50 && <Badge className="ml-2 bg-alert-moderate">Low</Badge>}
              </TableCell>
              <TableCell className="text-right">{resource.allocated}</TableCell>
              <TableCell className="hidden sm:table-cell">{resource.location}</TableCell>
              <TableCell className="hidden sm:table-cell">{resource.lastUpdated}</TableCell>
              <TableCell className="text-right">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => onRequestResource && onRequestResource(resource)}
                >
                  Request
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ResourceTable;
