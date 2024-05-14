
import * as React from 'react';
import MyAppBar from '@/components/appbar';
import List from '@/components/list-down';

export default function Home() {
  return (
    <div>
      <MyAppBar />
      <h1>Pokemon List</h1>
      <List/>
    </div>
  );
}

