'use client';

import React, { useState } from 'react';
import Map, { Marker, Popup, NavigationControl } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Issue } from '@/types';
import Image from 'next/image';
import { MapPin, X, ExternalLink } from 'lucide-react';
import { SeverityBadge } from '@/components/ui/severity-badge';
import Link from 'next/link';

interface MapContainerProps {
  issues: Issue[];
}

export default function MapContainer({ issues }: MapContainerProps) {
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);

  const getMarkerColor = (severity: string) => {
    switch (severity) {
      case 'critical': return '#ef4444'; // red-500
      case 'high': return '#f97316'; // orange-500
      case 'medium': return '#eab308'; // yellow-500
      case 'low': return '#3b82f6'; // blue-500
      case 'resolved': return '#10b981'; // emerald-500
      default: return '#94a3b8'; // slate-400
    }
  };

  return (
    <div className="w-full h-full relative rounded-xl overflow-hidden shadow-lg border border-border/60">
      <Map
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        initialViewState={{
          longitude: 77.2090, // Default to New Delhi or some center
          latitude: 28.6139,
          zoom: 11
        }}
        mapStyle="mapbox://styles/mapbox/dark-v11"
        style={{ width: '100%', height: '100%' }}
      >
        <NavigationControl position="bottom-right" />

        {issues.map(issue => (
          <Marker
            key={issue._id}
            longitude={issue.longitude}
            latitude={issue.latitude}
            anchor="bottom"
            onClick={e => {
              e.originalEvent.stopPropagation();
              setSelectedIssue(issue);
            }}
          >
            <div className="cursor-pointer hover:scale-110 transition-transform relative group">
              <MapPin 
                className="h-8 w-8 drop-shadow-md" 
                style={{ color: getMarkerColor(issue.severity), fill: getMarkerColor(issue.severity) }} 
              />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-2.5 h-3 w-3 bg-white rounded-full" />
            </div>
          </Marker>
        ))}

        {selectedIssue && (
          <Popup
            longitude={selectedIssue.longitude}
            latitude={selectedIssue.latitude}
            anchor="top"
            closeOnClick={false}
            onClose={() => setSelectedIssue(null)}
            className="z-50"
            maxWidth="300px"
          >
            <div className="flex flex-col gap-2 p-1">
              {selectedIssue.imageUrl && (
                <div className="w-full h-32 relative rounded-md overflow-hidden mb-1">
                  <Image 
                    src={selectedIssue.imageUrl} 
                    alt={selectedIssue.title} 
                    fill 
                    className="object-cover"
                  />
                </div>
              )}
              
              <h3 className="font-bold text-sm leading-tight">{selectedIssue.title}</h3>
              
              <div className="flex flex-wrap gap-1.5 items-center my-0.5">
                <SeverityBadge severity={selectedIssue.severity} />
                <span className="text-[10px] font-semibold px-1.5 py-0.5 bg-muted rounded border border-border/50">
                  {selectedIssue.status}
                </span>
              </div>
              
              <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                {selectedIssue.description}
              </p>
              
              <Link 
                href={`/map`} // In a real app this might go to an issue detail page
                className="mt-2 w-full flex items-center justify-center gap-1.5 bg-brand-blue text-white text-xs font-semibold py-2 rounded-md hover:bg-brand-blue/90 transition-colors"
                onClick={() => setSelectedIssue(null)}
              >
                View Details
                <ExternalLink className="h-3 w-3" />
              </Link>
            </div>
          </Popup>
        )}
      </Map>
    </div>
  );
}
