import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// Path to your local video file
const VIDEO_URL = '/assets/ssha/ssha.mp4';

// =====================================================================
// YOUR SSHA TIMESTAMPS ARRAY
// =====================================================================
// PASTE YOUR FULL 'SSHA_TIMESTAMPS' ARRAY HERE
const SSHA_TIMESTAMPS = [

    "Mar 2015", "Mar 2015", "Mar 2015", "Mar 2015", "Mar 2015", "Mar 2015", "Mar 2015", "Mar 2015", "Mar 2015", "Mar 2015", "Mar 2015", "Mar 2015", "Mar 2015", "Mar 2015", "Mar 2015",

    "Apr 2015", "Apr 2015", "Apr 2015", "Apr 2015", "Apr 2015", "Apr 2015", "Apr 2015", "Apr 2015", "Apr 2015", "Apr 2015", "Apr 2015", "Apr 2015", "Apr 2015", "Apr 2015", "Apr 2015",

    "May 2015", "May 2015", "May 2015", "May 2015", "May 2015", "May 2015", "May 2015", "May 2015", "May 2015", "May 2015", "May 2015", "May 2015", "May 2015", "May 2015", "May 2015",

    "Jun 2015", "Jun 2015", "Jun 2015", "Jun 2015", "Jun 2015", "Jun 2015", "Jun 2015", "Jun 2015", "Jun 2015", "Jun 2015", "Jun 2015", "Jun 2015", "Jun 2015", "Jun 2015", "Jun 2015",

    "Jul 2015", "Jul 2015", "Jul 2015", "Jul 2015", "Jul 2015", "Jul 2015", "Jul 2015", "Jul 2015", "Jul 2015", "Jul 2015", "Jul 2015", "Jul 2015", "Jul 2015", "Jul 2015", "Jul 2015",

    "Aug 2015", "Aug 2015", "Aug 2015", "Aug 2015", "Aug 2015", "Aug 2015", "Aug 2015", "Aug 2015", "Aug 2015", "Aug 2015", "Aug 2015", "Aug 2015", "Aug 2015", "Aug 2015", "Aug 2015",

    "Aug 2015", "Sep 2015", "Sep 2015", "Sep 2015", "Sep 2015", "Sep 2015", "Sep 2015", "Sep 2015", "Sep 2015", "Sep 2015", "Sep 2015", "Sep 2015", "Sep 2015", "Sep 2015", "Sep 2015",

    "Oct 2015", "Oct 2015", "Oct 2015", "Oct 2015", "Oct 2015", "Oct 2015", "Oct 2015", "Oct 2015", "Oct 2015", "Oct 2015", "Oct 2015", "Oct 2015", "Oct 2015", "Oct 2015", "Oct 2015",

    "Oct 2015", "Nov 2015", "Nov 2015", "Nov 2015", "Nov 2015", "Nov 2015", "Nov 2015", "Nov 2015", "Nov 2015", "Nov 2015", "Nov 2015", "Nov 2015", "Nov 2015", "Nov 2015", "Nov 2015",

    "Dec 2015", "Dec 2015", "Dec 2015", "Dec 2015", "Dec 2015", "Dec 2015", "Dec 2015", "Dec 2015", "Dec 2015", "Dec 2015", "Dec 2015", "Dec 2015", "Dec 2015", "Dec 2015", "Dec 2015",

    "Dec 2015", "Jan 2016", "Jan 2016", "Jan 2016", "Jan 2016", "Jan 2016", "Jan 2016", "Jan 2016", "Jan 2016", "Jan 2016", "Jan 2016", "Jan 2016", "Jan 2016", "Jan 2016", "Jan 2016",

    "Jan 2016", "Feb 2016", "Feb 2016", "Feb 2016", "Feb 2016", "Feb 2016", "Feb 2016", "Feb 2016", "Feb 2016", "Feb 2016", "Feb 2016", "Feb 2016", "Feb 2016", "Feb 2016", "Feb 2016",

    "Mar 2016", "Mar 2016", "Mar 2016", "Mar 2016", "Mar 2016", "Mar 2016", "Mar 2016", "Mar 2016", "Mar 2016", "Mar 2016", "Mar 2016", "Mar 2016", "Mar 2016", "Mar 2016", "Mar 2016",

    "Mar 2016", "Apr 2016", "Apr 2016", "Apr 2016", "Apr 2016", "Apr 2016", "Apr 2016", "Apr 2016", "Apr 2016", "Apr 2016", "Apr 2016", "Apr 2016", "Apr 2016", "Apr 2016", "Apr 2016",

    "May 2016", "May 2016", "May 2016", "May 2016", "May 2016", "May 2016", "May 2016", "May 2016", "May 2016", "May 2016", "May 2016", "May 2016", "May 2016", "May 2016", "May 2016",

    "May 2016", "Jun 2016", "Jun 2016", "Jun 2016", "Jun 2016", "Jun 2016", "Jun 2016", "Jun 2016", "Jun 2016", "Jun 2016", "Jun 2016", "Jun 2016", "Jun 2016", "Jun 2016", "Jun 2016",

    "Jul 2016", "Jul 2016", "Jul 2016", "Jul 2016", "Jul 2016", "Jul 2016", "Jul 2016", "Jul 2016", "Jul 2016", "Jul 2016", "Jul 2016", "Jul 2016", "Jul 2016", "Jul 2016", "Jul 2016",

    "Jul 2016", "Aug 2016", "Aug 2016", "Aug 2016", "Aug 2016", "Aug 2016", "Aug 2016", "Aug 2016", "Aug 2016", "Aug 2016", "Aug 2016", "Aug 2016", "Aug 2016", "Aug 2016", "Aug 2016",

    "Aug 2016", "Sep 2016", "Sep 2016", "Sep 2016", "Sep 2016", "Sep 2016", "Sep 2016", "Sep 2016", "Sep 2016", "Sep 2016", "Sep 2016", "Sep 2016", "Sep 2016", "Sep 2016", "Sep 2016",

    "Sep 2016", "Oct 2016", "Oct 2016", "Oct 2016", "Oct 2016", "Oct 2016", "Oct 2016", "Oct 2016", "Oct 2016", "Oct 2016", "Oct 2016", "Oct 2016", "Oct 2016", "Oct 2016", "Oct 2016",

    "Oct 2016", "Nov 2016", "Nov 2016", "Nov 2016", "Nov 2016", "Nov 2016", "Nov 2016", "Nov 2016", "Nov 2016", "Nov 2016", "Nov 2016", "Nov 2016", "Nov 2016", "Nov 2016", "Nov 2016",

    "Nov 2016", "Dec 2016", "Dec 2016", "Dec 2016", "Dec 2016", "Dec 2016", "Dec 2016", "Dec 2016", "Dec 2016", "Dec 2016", "Dec 2016", "Dec 2016", "Dec 2016", "Dec 2016", "Dec 2016",

    "Dec 2016", "Jan 2017", "Jan 2017", "Jan 2017", "Jan 2017", "Jan 2017", "Jan 2017", "Jan 2017", "Jan 2017", "Jan 2017", "Jan 2017", "Jan 2017", "Jan 2017", "Jan 2017", "Jan 2017",

    "Jan 2017", "Feb 2017", "Feb 2017", "Feb 2017", "Feb 2017", "Feb 2017", "Feb 2017", "Feb 2017", "Feb 2017", "Feb 2017", "Feb 2017", "Feb 2017", "Feb 2017", "Feb 2017", "Feb 2017",

    "Mar 2017", "Mar 2017", "Mar 2017", "Mar 2017", "Mar 2017", "Mar 2017", "Mar 2017", "Mar 2017", "Mar 2017", "Mar 2017", "Mar 2017", "Mar 2017", "Mar 2017", "Mar 2017", "Mar 2017",

    "Apr 2017", "Apr 2017", "Apr 2017", "Apr 2017", "Apr 2017", "Apr 2017", "Apr 2017", "Apr 2017", "Apr 2017", "Apr 2017", "Apr 2017", "Apr 2017", "Apr 2017", "Apr 2017", "Apr 2017",

    "May 2017", "May 2017", "May 2017", "May 2017", "May 2017", "May 2017", "May 2017", "May 2017", "May 2017", "May 2017", "May 2017", "May 2017", "May 2017", "May 2017", "May 2017",

    "Jun 2017", "Jun 2017", "Jun 2017", "Jun 2017", "Jun 2017", "Jun 2017", "Jun 2017", "Jun 2017", "Jun 2017", "Jun 2017", "Jun 2017", "Jun 2017", "Jun 2017", "Jun 2017", "Jun 2017",

    "Jul 2017", "Jul 2017", "Jul 2017", "Jul 2017", "Jul 2017", "Jul 2017", "Jul 2017", "Jul 2017", "Jul 2017", "Jul 2017", "Jul 2017", "Jul 2017", "Jul 2017", "Jul 2017", "Jul 2017",

    "Aug 2017", "Aug 2017", "Aug 2017", "Aug 2017", "Aug 2017", "Aug 2017", "Aug 2017", "Aug 2017", "Aug 2017", "Aug 2017", "Aug 2017", "Aug 2017", "Aug 2017", "Aug 2017", "Aug 2017",

    "Aug 2017", "Sep 2017", "Sep 2017", "Sep 2017", "Sep 2017", "Sep 2017", "Sep 2017", "Sep 2017", "Sep 2017", "Sep 2017", "Sep 2017", "Sep 2017", "Sep 2017", "Sep 2017", "Sep 2017",

    "Sep 2017", "Oct 2017", "Oct 2017", "Oct 2017", "Oct 2017", "Oct 2017", "Oct 2017", "Oct 2017", "Oct 2017", "Oct 2017", "Oct 2017", "Oct 2017", "Oct 2017", "Oct 2017", "Oct 2017",

    "Oct 2017", "Nov 2017", "Nov 2017", "Nov 2017", "Nov 2017", "Nov 2017", "Nov 2017", "Nov 2017", "Nov 2017", "Nov 2017", "Nov 2017", "Nov 2017", "Nov 2017", "Nov 2017", "Nov 2017",

    "Nov 2017", "Dec 2017", "Dec 2017", "Dec 2017", "Dec 2017", "Dec 2017", "Dec 2017", "Dec 2017", "Dec 2017", "Dec 2017", "Dec 2017", "Dec 2017", "Dec 2017", "Dec 2017", "Dec 2017",

    "Dec 2017", "Jan 2018", "Jan 2018", "Jan 2018", "Jan 2018", "Jan 2018", "Jan 2018", "Jan 2018", "Jan 2018", "Jan 2018", "Jan 2018", "Jan 2018", "Jan 2018", "Jan 2018", "Jan 2018",

    "Jan 2018", "Feb 2018", "Feb 2018", "Feb 2018", "Feb 2018", "Feb 2018", "Feb 2018", "Feb 2018", "Feb 2018", "Feb 2018", "Feb 2018", "Feb 2018", "Feb 2018", "Feb 2018", "Feb 2018",

    "Mar 2018", "Mar 2018", "Mar 2018", "Mar 2018", "Mar 2018", "Mar 2018", "Mar 2018", "Mar 2018", "Mar 2018", "Mar 2018", "Mar 2018", "Mar 2018", "Mar 2018", "Mar 2018", "Mar 2018",

    "Apr 2018", "Apr 2018", "Apr 2018", "Apr 2018", "Apr 2018", "Apr 2018", "Apr 2018", "Apr 2018", "Apr 2018", "Apr 2018", "Apr 2018", "Apr 2018", "Apr 2018", "Apr 2018", "Apr 2018",

    "May 2018", "May 2018", "May 2018", "May 2018", "May 2018", "May 2018", "May 2018", "May 2018", "May 2018", "May 2018", "May 2018", "May 2018", "May 2018", "May 2018", "May 2018",

    "Jun 2018", "Jun 2018", "Jun 2018", "Jun 2018", "Jun 2018", "Jun 2018", "Jun 2018", "Jun 2018", "Jun 2018", "Jun 2018", "Jun 2018", "Jun 2018", "Jun 2018", "Jun 2018", "Jun 2018",

    "Jul 2018", "Jul 2018", "Jul 2018", "Jul 2018", "Jul 2018", "Jul 2018", "Jul 2018", "Jul 2018", "Jul 2018", "Jul 2018", "Jul 2018", "Jul 2018", "Jul 2018", "Jul 2018", "Jul 2018",

    "Aug 2018", "Aug 2018", "Aug 2018", "Aug 2018", "Aug 2018", "Aug 2018", "Aug 2018", "Aug 2018", "Aug 2018", "Aug 2018", "Aug 2018", "Aug 2018", "Aug 2018", "Aug 2018", "Aug 2018",

    "Aug 2018", "Sep 2018", "Sep 2018", "Sep 2018", "Sep 2018", "Sep 2018", "Sep 2018", "Sep 2018", "Sep 2018", "Sep 2018", "Sep 2018", "Sep 2018", "Sep 2018", "Sep 2018", "Sep 2018",

    "Oct 2018", "Oct 2018", "Oct 2018", "Oct 2018", "Oct 2018", "Oct 2018", "Oct 2018", "Oct 2018", "Oct 2018", "Oct 2018", "Oct 2018", "Oct 2018", "Oct 2018", "Oct 2018", "Oct 2018",

    "Oct 2018", "Nov 2018", "Nov 2018", "Nov 2018", "Nov 2018", "Nov 2018", "Nov 2018", "Nov 2018", "Nov 2018", "Nov 2018", "Nov 2018", "Nov 2018", "Nov 2018", "Nov 2018", "Nov 2018",

    "Dec 2018", "Dec 2018", "Dec 2018", "Dec 2018", "Dec 2018", "Dec 2018", "Dec 2018", "Dec 2018", "Dec 2018", "Dec 2018", "Dec 2018", "Dec 2018", "Dec 2018", "Dec 2018", "Dec 2018",

    "Dec 2018", "Jan 2019", "Jan 2019", "Jan 2019", "Jan 2019", "Jan 2019", "Jan 2019", "Jan 2019", "Jan 2019", "Jan 2019", "Jan 2019", "Jan 2019", "Jan 2019", "Jan 2019", "Jan 2019",

    "Jan 2019", "Feb 2019", "Feb 2019", "Feb 2019", "Feb 2019", "Feb 2019", "Feb 2019", "Feb 2019", "Feb 2019", "Feb 2019", "Feb 2019", "Feb 2019", "Feb 2019", "Feb 2019", "Feb 2019",

    "Mar 2019", "Mar 2019", "Mar 2019", "Mar 2019", "Mar 2019", "Mar 2019", "Mar 2019", "Mar 2019", "Mar 2019", "Mar 2019", "Mar 2019", "Mar 2019", "Mar 2019", "Mar 2019", "Mar 2019",

    "Apr 2019", "Apr 2019", "Apr 2019", "Apr 2019", "Apr 2019", "Apr 2019", "Apr 2019", "Apr 2019", "Apr 2019", "Apr 2019", "Apr 2019", "Apr 2019", "Apr 2019", "Apr 2019", "Apr 2019",

    "May 2019", "May 2019", "May 2019", "May 2019", "May 2019", "May 2019", "May 2019", "May 2019", "May 2019", "May 2019", "May 2019", "May 2019", "May 2019", "May 2019", "May 2019",

    "Jun 2019", "Jun 2019", "Jun 2019", "Jun 2019", "Jun 2019", "Jun 2019", "Jun 2019", "Jun 2019", "Jun 2019", "Jun 2019", "Jun 2019", "Jun 2019", "Jun 2019", "Jun 2019", "Jun 2019",

    "Jul 2019", "Jul 2019", "Jul 2019", "Jul 2019", "Jul 2019", "Jul 2019", "Jul 2019", "Jul 2019", "Jul 2019", "Jul 2019", "Jul 2019", "Jul 2019", "Jul 2019", "Jul 2019", "Jul 2019",

    "Aug 2019", "Aug 2019", "Aug 2019", "Aug 2019", "Aug 2019", "Aug 2019", "Aug 2019", "Aug 2019", "Aug 2019", "Aug 2019", "Aug 2019", "Aug 2019", "Aug 2019", "Aug 2019", "Aug 2019",

    "Sep 2019", "Sep 2019", "Sep 2019", "Sep 2019", "Sep 2019", "Sep 2019", "Sep 2019", "Sep 2019", "Sep 2019", "Sep 2019", "Sep 2019", "Sep 2019", "Sep 2019", "Sep 2019", "Sep 2019",

    "Oct 2019", "Oct 2019", "Oct 2019", "Oct 2019", "Oct 2019", "Oct 2019", "Oct 2019", "Oct 2019", "Oct 2019", "Oct 2019", "Oct 2019", "Oct 2019", "Oct 2019", "Oct 2019", "Oct 2019",

    "Nov 2019", "Nov 2019", "Nov 2019", "Nov 2019", "Nov 2019", "Nov 2019", "Nov 2019", "Nov 2019", "Nov 2019", "Nov 2019", "Nov 2019", "Nov 2019", "Nov 2019", "Nov 2019", "Nov 2019",

    "Dec 2019", "Dec 2019", "Dec 2019", "Dec 2019", "Dec 2019", "Dec 2019", "Dec 2019", "Dec 2019", "Dec 2019", "Dec 2019", "Dec 2019", "Dec 2019", "Dec 2019", "Dec 2019", "Dec 2019",

    "Jan 2020", "Jan 2020", "Jan 2020", "Jan 2020", "Jan 2020", "Jan 2020", "Jan 2020", "Jan 2020", "Jan 2020", "Jan 2020", "Jan 2020", "Jan 2020", "Jan 2020", "Jan 2020", "Jan 2020",

    "Jan 2020", "Feb 2020", "Feb 2020", "Feb 2020", "Feb 2020", "Feb 2020", "Feb 2020", "Feb 2020", "Feb 2020", "Feb 2020", "Feb 2020", "Feb 2020", "Feb 2020", "Feb 2020", "Feb 2020",

    "Mar 2020", "Mar 2020", "Mar 2020", "Mar 2020", "Mar 2020", "Mar 2020", "Mar 2020", "Mar 2020", "Mar 2020", "Mar 2020", "Mar 2020", "Mar 2020", "Mar 2020", "Mar 2020", "Mar 2020",

    "Apr 2020", "Apr 2020", "Apr 2020", "Apr 2020", "Apr 2020", "Apr 2020", "Apr 2020", "Apr 2020", "Apr 2020", "Apr 2020", "Apr 2020", "Apr 2020", "Apr 2020", "Apr 2020", "Apr 2020",

    "May 2020", "May 2020", "May 2020", "May 2020", "May 2020", "May 2020", "May 2020", "May 2020", "May 2020", "May 2020", "May 2020", "May 2020", "May 2020", "May 2020", "May 2020",

    "Jun 2020", "Jun 2020", "Jun 2020", "Jun 2020", "Jun 2020", "Jun 2020", "Jun 2020", "Jun 2020", "Jun 2020", "Jun 2020", "Jun 2020", "Jun 2020", "Jun 2020", "Jun 2020", "Jun 2020",

    "Jul 2020", "Jul 2020", "Jul 2020", "Jul 2020", "Jul 2020", "Jul 2020", "Jul 2020", "Jul 2020", "Jul 2020", "Jul 2020", "Jul 2020", "Jul 2020", "Jul 2020", "Jul 2020", "Jul 2020",

    "Aug 2020", "Aug 2020", "Aug 2020", "Aug 2020", "Aug 2020", "Aug 2020", "Aug 2020", "Aug 2020", "Aug 2020", "Aug 2020", "Aug 2020", "Aug 2020", "Aug 2020", "Aug 2020", "Aug 2020",

    "Aug 2020", "Sep 2020", "Sep 2020", "Sep 2020", "Sep 2020", "Sep 2020", "Sep 2020", "Sep 2020", "Sep 2020", "Sep 2020", "Sep 2020", "Sep 2020", "Sep 2020", "Sep 2020", "Sep 2020",

    "Oct 2020", "Oct 2020", "Oct 2020", "Oct 2020", "Oct 2020", "Oct 2020", "Oct 2020", "Oct 2020", "Oct 2020", "Oct 2020", "Oct 2020", "Oct 2020", "Oct 2020", "Oct 2020", "Oct 2020",

    "Oct 2020", "Nov 2020", "Nov 2020", "Nov 2020", "Nov 2020", "Nov 2020", "Nov 2020", "Nov 2020", "Nov 2020", "Nov 2020", "Nov 2020", "Nov 2020", "Nov 2020", "Nov 2020", "Nov 2020",

    "Dec 2020", "Dec 2020", "Dec 2020", "Dec 2020", "Dec 2020", "Dec 2020", "Dec 2020", "Dec 2020", "Dec 2020", "Dec 2020", "Dec 2020", "Dec 2020", "Dec 2020", "Dec 2020", "Dec 2020",

    "Dec 2020", "Jan 2021", "Jan 2021", "Jan 2021", "Jan 2021", "Jan 2021", "Jan 2021", "Jan 2021", "Jan 2021", "Jan 2021", "Jan 2021", "Jan 2021", "Jan 2021", "Jan 2021", "Jan 2021",

    "Jan 2021", "Feb 2021", "Feb 2021", "Feb 2021", "Feb 2021", "Feb 2021", "Feb 2021", "Feb 2021", "Feb 2021", "Feb 2021", "Feb 2021", "Feb 2021", "Feb 2021", "Feb 2021", "Feb 2021",

    "Mar 2021", "Mar 2021", "Mar 2021", "Mar 2021", "Mar 2021", "Mar 2021", "Mar 2021", "Mar 2021", "Mar 2021", "Mar 2021", "Mar 2021", "Mar 2021", "Mar 2021", "Mar 2021", "Mar 2021",

    "Apr 2021", "Apr 2021", "Apr 2021", "Apr 2021", "Apr 2021", "Apr 2021", "Apr 2021", "Apr 2021", "Apr 2021", "Apr 2021", "Apr 2021", "Apr 2021", "Apr 2021", "Apr 2021", "Apr 2021",

    "May 2021", "May 2021", "May 2021", "May 2021", "May 2021", "May 2021", "May 2021", "May 2021", "May 2021", "May 2021", "May 2021", "May 2021", "May 2021", "May 2021", "May 2021",

    "Jun 2021", "Jun 2021", "Jun 2021", "Jun 2021", "Jun 2021", "Jun 2021", "Jun 2021", "Jun 2021", "Jun 2021", "Jun 2021", "Jun 2021", "Jun 2021", "Jun 2021", "Jun 2021", "Jun 2021",

    "Jul 2021", "Jul 2021", "Jul 2021", "Jul 2021", "Jul 2021", "Jul 2021", "Jul 2021", "Jul 2021", "Jul 2021", "Jul 2021", "Jul 2021", "Jul 2021", "Jul 2021", "Jul 2021", "Jul 2021",

    "Aug 2021", "Aug 2021", "Aug 2021", "Aug 2021", "Aug 2021", "Aug 2021", "Aug 2021", "Aug 2021", "Aug 2021", "Aug 2021", "Aug 2021", "Aug 2021", "Aug 2021", "Aug 2021", "Aug 2021",

    "Sep 2021", "Sep 2021", "Sep 2021", "Sep 2021", "Sep 2021", "Sep 2021", "Sep 2021", "Sep 2021", "Sep 2021", "Sep 2021", "Sep 2021", "Sep 2021", "Sep 2021", "Sep 2021", "Sep 2021",

    "Oct 2021", "Oct 2021", "Oct 2021", "Oct 2021", "Oct 2021", "Oct 2021", "Oct 2021", "Oct 2021", "Oct 2021", "Oct 2021", "Oct 2021", "Oct 2021", "Oct 2021", "Oct 2021", "Oct 2021",

    "Oct 2021", "Nov 2021", "Nov 2021", "Nov 2021", "Nov 2021", "Nov 2021", "Nov 2021", "Nov 2021", "Nov 2021", "Nov 2021", "Nov 2021", "Nov 2021", "Nov 2021", "Nov 2021", "Nov 2021",

    "Dec 2021", "Dec 2021", "Dec 2021", "Dec 2021", "Dec 2021", "Dec 2021", "Dec 2021", "Dec 2021", "Dec 2021", "Dec 2021", "Dec 2021", "Dec 2021", "Dec 2021", "Dec 2021", "Dec 2021",

    "Dec 2021", "Jan 2022", "Jan 2022", "Jan 2022", "Jan 2022", "Jan 2022", "Jan 2022", "Jan 2022", "Jan 2022", "Jan 2022", "Jan 2022", "Jan 2022", "Jan 2022", "Jan 2022", "Jan 2022",

    "Jan 2022", "Feb 2022", "Feb 2022", "Feb 2022", "Feb 2022", "Feb 2022", "Feb 2022", "Feb 2022", "Feb 2022", "Feb 2022", "Feb 2022", "Feb 2022", "Feb 2022", "Feb 2022", "Feb 2022",

    "Mar 2022", "Mar 2022", "Mar 2022", "Mar 2022", "Mar 2022", "Mar 2022", "Mar 2022", "Mar 2022", "Mar 2022", "Mar 2022", "Mar 2022", "Mar 2022", "Mar 2022", "Mar 2022", "Mar 2022",

    "Apr 2022", "Apr 2022", "Apr 2022", "Apr 2022", "Apr 2022", "Apr 2022", "Apr 2022", "Apr 2022", "Apr 2022", "Apr 2022", "Apr 2022", "Apr 2022", "Apr 2022", "Apr 2022", "Apr 2022",

    "May 2022", "May 2022", "May 2022", "May 2022", "May 2022", "May 2022", "May 2022", "May 2022", "May 2022", "May 2022", "May 2022", "May 2022", "May 2022", "May 2022", "May 2022",

    "Jun 2022", "Jun 2022", "Jun 2022", "Jun 2022", "Jun 2022", "Jun 2022", "Jun 2022", "Jun 2022", "Jun 2022", "Jun 2022", "Jun 2022", "Jun 2022", "Jun 2022", "Jun 2022", "Jun 2022",

    "Jul 2022", "Jul 2022", "Jul 2022", "Jul 2022", "Jul 2022", "Jul 2022", "Jul 2022", "Jul 2022", "Jul 2022", "Jul 2022", "Jul 2022", "Jul 2022", "Jul 2022", "Jul 2022", "Jul 2022",

    "Aug 2022", "Aug 2022", "Aug 2022", "Aug 2022", "Aug 2022", "Aug 2022", "Aug 2022", "Aug 2022", "Aug 2022", "Aug 2022", "Aug 2022", "Aug 2022", "Aug 2022", "Aug 2022", "Aug 2022",

    "Sep 2022", "Sep 2022", "Sep 2022", "Sep 2022", "Sep 2022", "Sep 2022", "Sep 2022", "Sep 2022", "Sep 2022", "Sep 2022", "Sep 2022", "Sep 2022", "Sep 2022", "Sep 2022", "Sep 2022",

    "Oct 2022", "Oct 2022", "Oct 2022", "Oct 2022", "Oct 2022", "Oct 2022", "Oct 2022", "Oct 2022", "Oct 2022", "Oct 2022", "Oct 2022", "Oct 2022", "Oct 2022", "Oct 2022", "Oct 2022",

    "Nov 2022", "Nov 2022", "Nov 2022", "Nov 2022", "Nov 2022", "Nov 2022", "Nov 2022", "Nov 2022", "Nov 2022", "Nov 2022", "Nov 2022", "Nov 2022", "Nov 2022", "Nov 2022", "Nov 2022",

    "Dec 2022", "Dec 2022", "Dec 2022", "Dec 2022", "Dec 2022", "Dec 2022", "Dec 2022", "Dec 2022", "Dec 2022", "Dec 2022", "Dec 2022", "Dec 2022", "Dec 2022", "Dec 2022", "Dec 2022",

    "Jan 2023", "Jan 2023", "Jan 2023", "Jan 2023", "Jan 2023", "Jan 2023", "Jan 2023", "Jan 2023", "Jan 2023", "Jan 2023", "Jan 2023", "Jan 2023", "Jan 2023", "Jan 2023", "Jan 2023",

    "Jan 2023", "Feb 2023", "Feb 2023", "Feb 2023", "Feb 2023", "Feb 2023", "Feb 2023", "Feb 2023", "Feb 2023", "Feb 2023", "Feb 2023", "Feb 2023", "Feb 2023", "Feb 2023", "Mar 2023",

    "Mar 2023", "Mar 2023", "Mar 2023", "Mar 2023", "Mar 2023", "Mar 2023", "Mar 2023", "Mar 2023", "Mar 2023", "Mar 2023", "Mar 2023", "Mar 2023", "Mar 2023", "Mar 2023", "Mar 2023",

    "Apr 2023", "Apr 2023", "Apr 2023", "Apr 2023", "Apr 2023", "Apr 2023", "Apr 2023", "Apr 2023", "Apr 2023", "Apr 2023", "Apr 2023", "Apr 2023", "Apr 2023", "Apr 2023", "May 2023",

    "May 2023", "May 2023", "May 2023", "May 2023", "May 2023", "May 2023", "May 2023", "May 2023", "May 2023", "May 2023", "May 2023", "May 2023", "May 2023", "May 2023", "May 2023",

    "Jun 2023", "Jun 2023", "Jun 2023", "Jun 2023", "Jun 2023", "Jun 2023", "Jun 2023", "Jun 2023", "Jun 2023", "Jun 2023", "Jun 2023", "Jun 2023", "Jun 2023", "Jun 2023", "Jun 2023",

    "Jul 2023", "Jul 2023", "Jul 2023", "Jul 2023", "Jul 2023", "Jul 2023", "Jul 2023", "Jul 2023", "Jul 2023", "Jul 2023", "Jul 2023", "Jul 2023", "Jul 2023", "Jul 2023", "Jul 2023",

    "Aug 2023", "Aug 2023", "Aug 2023", "Aug 2023", "Aug 2023", "Aug 2023", "Aug 2023", "Aug 2023", "Aug 2023", "Aug 2023", "Aug 2023", "Aug 2023", "Aug 2023", "Aug 2023", "Aug 2023",

    "Sep 2023", "Sep 2023", "Sep 2023", "Sep 2023", "Sep 2023", "Sep 2023", "Sep 2023", "Sep 2023", "Sep 2023", "Sep 2023", "Sep 2023", "Sep 2023", "Sep 2023", "Sep 2023", "Sep 2023",

    "Oct 2023", "Oct 2023", "Oct 2023", "Oct 2023", "Oct 2023", "Oct 2023", "Oct 2023", "Oct 2023", "Oct 2023", "Oct 2023", "Oct 2023", "Oct 2023", "Oct 2023", "Oct 2023", "Oct 2023",

    "Nov 2023", "Nov 2023", "Nov 2023", "Nov 2023", "Nov 2023", "Nov 2023", "Nov 2023", "Nov 2023", "Nov 2023", "Nov 2023", "Nov 2023", "Nov 2023", "Nov 2023", "Nov 2023", "Nov 2023",

    "Dec 2023", "Dec 2023", "Dec 2023", "Dec 2023", "Dec 2023", "Dec 2023", "Dec 2023", "Dec 2023", "Dec 2023", "Dec 2023", "Dec 2023", "Dec 2023", "Dec 2023", "Dec 2023", "Dec 2023",

    "Jan 2024", "Jan 2024", "Jan 2024", "Jan 2024", "Jan 2024", "Jan 2024", "Jan 2024", "Jan 2024", "Jan 2024", "Jan 2024", "Jan 2024", "Jan 2024", "Jan 2024", "Jan 2024", "Jan 2024",

    "Feb 2024", "Feb 2024", "Feb 2024", "Feb 2024", "Feb 2024", "Feb 2024", "Feb 2024", "Feb 2024", "Feb 2024", "Feb 2024", "Feb 2024", "Feb 2024", "Feb 2024", "Feb 2024", "Feb 2024",

    "Mar 2024", "Mar 2024", "Mar 2024", "Mar 2024", "Mar 2024", "Mar 2024", "Mar 2024", "Mar 2024", "Mar 2024", "Mar 2024", "Mar 2024", "Mar 2024", "Mar 2024", "Mar 2024", "Mar 2024",

    "Apr 2024", "Apr 2024", "Apr 2024", "Apr 2024", "Apr 2024", "Apr 2024", "Apr 2024", "Apr 2024", "Apr 2024", "Apr 2024", "Apr 2024", "Apr 2024", "Apr 2024", "Apr 2024", "Apr 2024",

    "May 2024", "May 2024", "May 2024", "May 2024", "May 2024", "May 2024", "May 2024", "May 2024", "May 2024", "May 2024", "May 2024", "May 2024", "May 2024", "May 2024", "May 2024",

    "Jun 2024", "Jun 2024", "Jun 2024", "Jun 2024", "Jun 2024", "Jun 2024", "Jun 2024", "Jun 2024", "Jun 2024", "Jun 2024", "Jun 2024", "Jun 2024", "Jun 2024", "Jun 2024", "Jun 2024",

    "Jul 2024", "Jul 2024", "Jul 2024", "Jul 2024", "Jul 2024", "Jul 2024", "Jul 2024", "Jul 2024", "Jul 2024", "Jul 2024", "Jul 2024", "Jul 2024", "Jul 2024", "Jul 2024", "Jul 2024",

    "Aug 2024", "Aug 2024", "Aug 2024", "Aug 2024", "Aug 2024", "Aug 2024", "Aug 2024", "Aug 2024", "Aug 2024", "Aug 2024", "Aug 2024", "Aug 2024", "Aug 2024", "Aug 2024", "Aug 2024",

    "Sep 2024", "Sep 2024", "Sep 2024", "Sep 2024", "Sep 2024", "Sep 2024", "Sep 2024", "Sep 2024", "Sep 2024", "Sep 2024", "Sep 2024", "Sep 2024", "Sep 2024", "Sep 2024", "Sep 2024",

    "Oct 2024", "Oct 2024", "Oct 2024", "Oct 2024", "Oct 2024", "Oct 2024", "Oct 2024", "Oct 2024", "Oct 2024", "Oct 2024", "Oct 2024", "Oct 2024", "Oct 2024", "Oct 2024", "Oct 2024",

    "Nov 2024", "Nov 2024", "Nov 2024", "Nov 2024", "Nov 2024", "Nov 2024", "Nov 2024", "Nov 2024", "Nov 2024", "Nov 2024", "Nov 2024", "Nov 2024", "Nov 2024", "Nov 2024", "Nov 2024",

    "Dec 2024", "Dec 2024", "Dec 2024", "Dec 2024", "Dec 2024", "Dec 2024", "Dec 2024", "Dec 2024", "Dec 2024", "Dec 2024", "Dec 2024", "Dec 2024", "Dec 2024", "Dec 2024", "Dec 2024",

    "Jan 2025", "Jan 2025", "Jan 2025", "Jan 2025", "Jan 2025", "Jan 2025", "Jan 2025", "Jan 2025", "Jan 2025", "Jan 2025", "Jan 2025", "Jan 2025", "Jan 2025", "Jan 2025", "Jan 2025",

    "Jan 2025", "Feb 2025", "Feb 2025", "Feb 2025", "Feb 2025", "Feb 2025", "Feb 2025", "Feb 2025", "Feb 2025", "Feb 2025", "Feb 2025", "Feb 2025", "Feb 2025", "Feb 2025", "Feb 2025",

    "Mar 2025"

];


function useVideoTexture(onLoaded) {
    const [video] = useState(() => {
        const vid = document.createElement('video');
        vid.src = VIDEO_URL;
        vid.loop = true;
        vid.muted = true;
        vid.playsInline = true;
        vid.playbackRate = 1.0; 
        vid.onloadedmetadata = () => {
            onLoaded(vid.duration);
        };
        return vid;
    });

    const videoTexture = useMemo(() => new THREE.VideoTexture(video), [video]);
    return [video, videoTexture];
}

function RotatingGlobe({ videoTexture }) {
    const meshRef = useRef();
    const material = useMemo(() => new THREE.MeshBasicMaterial({ map: videoTexture }), [videoTexture]);

    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.001;
        }
    });

    return (
        <mesh ref={meshRef} material={material}>
            <sphereGeometry args={[2, 64, 64]} />
        </mesh>
    );
}

const GlobeVideoViewer = ({ video, videoTexture }) => {
     return (
        <div className="w-full h-full relative">
            <Canvas camera={{ position: [0, 0, 4] }}>
                <ambientLight intensity={0.5} />
                <RotatingGlobe videoTexture={videoTexture} />
                <OrbitControls enableZoom={true} enablePan={false} />
            </Canvas>
            <div className="absolute top-4 right-4 p-3 bg-black bg-opacity-50 text-white text-xs rounded-bl-lg">
                <p className="mt-1">Use mouse to rotate and zoom.</p>
            </div>
        </div>
    );
};

const OceanTimeline = () => {
    const [currentDataType, setCurrentDataType] = useState('sst');
    const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [loading, setLoading] = useState(true);
    const [imageLoading, setImageLoading] = useState(true);
    const [preloadProgress, setPreloadProgress] = useState(0);
    const [imageCache] = useState(new Map());
    const [videoDuration, setVideoDuration] = useState(0);

    const [video, videoTexture] = useVideoTexture(setVideoDuration);
    
    const sstFrames = useMemo(() => {
      const frames = [];
      const years = ['03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25'];
      const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
      
      years.forEach(year => {
        months.forEach(month => {
          const fullYear = 2000 + parseInt(year);
          const filename = `${month}_01_${year}.png`;
          
          frames.push({
            id: `sst-${fullYear}-${month}`,
            date: new Date(fullYear, parseInt(month) - 1, 1),
            year: fullYear,
            month,
            displayName: `${fullYear}-${month}`,
            type: 'sst',
            imagePath: `/assets/sst/images/${filename}`,
            label: `SST ${fullYear}-${month}`,
          });
        });
      });
      return frames.sort((a, b) => a.date - b.date);
    }, []);

    const sssFrames = useMemo(() => {
      const frames = [];
      const years = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023];
      const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
      
      years.forEach(year => {
        months.forEach(month => {
          if (year === 2015 && parseInt(month) < 4) return;
          const filename = `${month}_${year}.png`;
          
          frames.push({
            id: `sss-${year}-${month}`,
            date: new Date(year, parseInt(month) - 1, 1),
            year,
            month,
            displayName: `${year}-${month}`,
            type: 'sss',
            imagePath: `/assets/sss/pngs/${filename}`,
            label: `SSS ${year}-${month}`,
          });
        });
      });
      return frames.sort((a, b) => a.date - b.date);
    }, []);

    const chlFrames = useMemo(() => {
        const frames = [];
        const years = ['03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25'];
        const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
        
        years.forEach(year => {
            months.forEach(month => {
            const fullYear = 2000 + parseInt(year);
            const filename = `${month}_01_${year}.png`;

            frames.push({
                id: `chl-${fullYear}-${month}`,
                date: new Date(fullYear, parseInt(month) - 1, 1),
                year: fullYear,
                month,
                displayName: `${fullYear}-${month}`,
                type: 'chl',
                imagePath: `/assets/chl/${filename}`,
                label: `CHL ${fullYear}-${month}`,
            });
            });
        });
        return frames.sort((a, b) => a.date - b.date);
    }, []);

    const sshaUniqueFrames = useMemo(() => {
        const monthCounts = SSHA_TIMESTAMPS.reduce((acc, timestamp) => {
            acc[timestamp] = (acc[timestamp] || 0) + 1;
            return acc;
        }, {});

        const uniqueTimestamps = [...new Set(SSHA_TIMESTAMPS)];
        const monthMap = { "Jan": 0, "Feb": 1, "Mar": 2, "Apr": 3, "May": 4, "Jun": 5, "Jul": 6, "Aug": 7, "Sep": 8, "Oct": 9, "Nov": 10, "Dec": 11 };

        const sortedUnique = uniqueTimestamps
            .map(ts => ({
                displayName: ts,
                date: new Date(parseInt(ts.split(' ')[1]), monthMap[ts.split(' ')[0]]),
            }))
            .sort((a, b) => a.date - b.date);

        const frameMap = {};
        let currentIndex = 0;
        SSHA_TIMESTAMPS.forEach(ts => {
            if (!frameMap[ts]) {
                frameMap[ts] = currentIndex;
            }
            currentIndex++;
        });

        return sortedUnique.map((item, index) => ({
            id: `ssha-unique-${index}`,
            displayName: item.displayName,
            count: monthCounts[item.displayName],
            startIndex: frameMap[item.displayName],
        }));
    }, []);

    const sshaPlaybackFrames = useMemo(() => 
        SSHA_TIMESTAMPS.map((ts, index) => ({
            id: `ssha-playback-${index}`,
            displayName: ts,
            frameIndex: index
        }))
    , []);
    
    const frames = useMemo(() => {
        if (currentDataType === 'sst') return sstFrames;
        if (currentDataType === 'sss') return sssFrames;
        if (currentDataType === 'chl') return chlFrames;
        if (currentDataType === 'ssha') return sshaPlaybackFrames;
        return [];
    }, [currentDataType, sstFrames, sssFrames, chlFrames, sshaPlaybackFrames]);

    const displayFrames = useMemo(() => {
        if (currentDataType === 'ssha') return sshaUniqueFrames;
        return frames;
    }, [currentDataType, sshaUniqueFrames, frames]);

    const currentUniqueFrameIndexForSSHA = useMemo(() => {
        if (currentDataType !== 'ssha') return -1;
        return sshaUniqueFrames.findIndex((frame, i) => {
            const nextFrame = sshaUniqueFrames[i + 1];
            if (nextFrame) {
                return currentFrameIndex >= frame.startIndex && currentFrameIndex < nextFrame.startIndex;
            }
            return currentFrameIndex >= frame.startIndex;
        });
    }, [currentFrameIndex, sshaUniqueFrames, currentDataType]);


    // --- Preload/Logic Handlers ---
    const preloadImages = useCallback(async (framesToPreload) => {
        const batchSize = 5;
        const totalImages = framesToPreload.length;
        let loadedCount = 0;
        for (let i = 0; i < framesToPreload.length; i += batchSize) {
            const batch = framesToPreload.slice(i, i + batchSize);
            await Promise.allSettled(
            batch.map(frame => {
                return new Promise((resolve) => {
                if (imageCache.has(frame.imagePath)) {
                    loadedCount++;
                    setPreloadProgress(Math.round((loadedCount / totalImages) * 100));
                    resolve();
                    return;
                }
                const img = new Image();
                img.onload = () => {
                    imageCache.set(frame.imagePath, img);
                    loadedCount++;
                    setPreloadProgress(Math.round((loadedCount / totalImages) * 100));
                    resolve();
                };
                img.onerror = () => {
                    loadedCount++;
                    setPreloadProgress(Math.round((loadedCount / totalImages) * 100));
                    resolve();
                };
                img.src = frame.imagePath;
                });
            })
            );
        }
    }, [imageCache]);

    useEffect(() => {
        if (currentDataType === 'ssha') {
            setLoading(false);
            setCurrentFrameIndex(0);
            setIsPlaying(false);
            if(video.paused) video.play();
            return;
        }

        setLoading(true);
        setCurrentFrameIndex(0);
        setPreloadProgress(0);
        setIsPlaying(false);
        if(!video.paused) video.pause();
        
        const initialFrames = frames.slice(0, 10);
        preloadImages(initialFrames).then(() => {
            setLoading(false);
            if (frames.length > 10) {
                preloadImages(frames.slice(10));
            }
        });
    }, [currentDataType, frames, preloadImages, video]);

    useEffect(() => {
        if (!isPlaying || frames.length === 0) return;
        
        const interval = setInterval(() => {
            setCurrentFrameIndex(prev => (prev + 1) % frames.length);
        }, 1000 ); 
        
        return () => clearInterval(interval);
    }, [isPlaying, frames.length]);

    useEffect(() => {
        if (currentDataType === 'ssha' && videoDuration > 0 && frames.length > 0) {
            const targetTime = (currentFrameIndex / frames.length) * videoDuration;
            // Add a small buffer to prevent stuttering
            if (Math.abs(video.currentTime - targetTime) > 0.1) {
                video.currentTime = targetTime;
            }
        }
    }, [currentFrameIndex, currentDataType, video, videoDuration, frames]);

    const currentFrame = frames[currentFrameIndex];

    const handleFrameClick = useCallback((index) => {
        setCurrentFrameIndex(index);
        setIsPlaying(false);
    }, []);

    const handleImageLoad = useCallback(() => setImageLoading(false), []);
    const handleImageError = useCallback(() => setImageLoading(false), []);


    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-50">
              <div className="flex flex-col items-center space-y-4">
                <div className="w-12 h-12 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
                <p className="text-gray-600 font-medium">Loading ocean data...</p>
                {preloadProgress > 0 && (
                  <div className="w-64">
                    <div className="bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gray-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${preloadProgress}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 text-center mt-2">{preloadProgress}% loaded</p>
                  </div>
                )}
              </div>
            </div>
          );
    }

    return (
        <div className="h-screen bg-gray-50 p-4 flex flex-col">
            <div className="flex-grow bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden flex flex-col">
                
                {/* Header */}
                <div className="bg-white border-b border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-semibold text-gray-900">Ocean Data Timeline</h1>
                            <p className="text-gray-600 mt-1">Temporal analysis of sea surface parameters</p>
                        </div>
                        
                        <div className="flex bg-gray-100 rounded-lg p-1">
                            {['sst', 'sss', 'chl', 'ssha'].map(type => (
                                <button
                                    key={type}
                                    onClick={() => setCurrentDataType(type)}
                                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                                        currentDataType === type
                                        ? 'bg-white text-gray-900 shadow-sm'
                                        : 'text-gray-600 hover:text-gray-900'
                                    }`}
                                >
                                    {type === 'sst' && 'Temperature'}
                                    {type === 'sss' && 'Salinity'}
                                    {type === 'chl' && 'Sea Color'}
                                    {type === 'ssha' && 'Surface Height'}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex-1 flex flex-col" style={{minHeight: 0}}>
                    <div className="flex-1 flex" style={{minHeight: 0}}>
                        
                        <div className="flex-1 p-6 flex items-center justify-center bg-gray-50">
                            {currentDataType === 'ssha' ? (
                                <GlobeVideoViewer video={video} videoTexture={videoTexture} />
                            ) : (
                                currentFrame && (
                                <div className="relative max-w-full max-h-full">
                                    {imageLoading && !imageCache.has(currentFrame.imagePath) && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded">
                                        <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
                                    </div>
                                    )}
                                    <img
                                    src={currentFrame.imagePath}
                                    alt={currentFrame.label || ''}
                                    className={`max-w-full max-h-full object-contain rounded shadow-sm transition-opacity duration-200 ${
                                        imageLoading && !imageCache.has(currentFrame.imagePath) ? 'opacity-0' : 'opacity-100'
                                    }`}
                                    onLoad={handleImageLoad}
                                    onError={handleImageError}
                                    onLoadStart={() => !imageCache.has(currentFrame.imagePath) && setImageLoading(true)}
                                    loading="eager"
                                    />
                                </div>
                                )
                            )}
                        </div>

                        <div className="w-80 bg-white border-l border-gray-200 p-6 flex flex-col">
                            {currentFrame ? (
                                <div className="space-y-6 flex-grow flex flex-col">
                                    <div className="bg-gray-50 rounded-lg p-4">
                                        <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                                            {{
                                                'sst': 'Sea Surface Temperature',
                                                'sss': 'Sea Surface Salinity',
                                                'chl': 'Chlorophyll-a',
                                                'ssha': 'Sea Surface Height Anomaly'
                                            }[currentDataType]}
                                        </div>
                                        <div className="text-2xl font-bold text-gray-900 mb-1">
                                            {currentFrame.displayName}
                                        </div>
                                         <div className="text-sm text-gray-600">
                                           Frame {currentFrameIndex + 1} of {frames.length}
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-3">
                                        <div className="text-xs font-medium text-gray-700 uppercase tracking-wide">Jump to Frame</div>
                                        <div className="flex space-x-2">
                                            <input
                                                type="number"
                                                min="1"
                                                max={frames.length}
                                                value={currentFrameIndex + 1}
                                                onChange={(e) => {
                                                    const frameNum = parseInt(e.target.value);
                                                    if (frameNum >= 1 && frameNum <= frames.length) {
                                                        setCurrentFrameIndex(frameNum - 1);
                                                        setIsPlaying(false);
                                                    }
                                                }}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                                                placeholder="Frame #"
                                            />
                                            <select
                                                value={currentDataType === 'ssha' ? currentUniqueFrameIndexForSSHA : currentFrameIndex}
                                                onChange={(e) => {
                                                    const newIndex = parseInt(e.target.value);
                                                    if (currentDataType === 'ssha') {
                                                        const newStartIndex = sshaUniqueFrames[newIndex].startIndex;
                                                        setCurrentFrameIndex(newStartIndex);
                                                    } else {
                                                        setCurrentFrameIndex(newIndex);
                                                    }
                                                    setIsPlaying(false);
                                                }}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                                            >
                                                {displayFrames.map((frame, index) => (
                                                    <option key={frame.id} value={index}>
                                                        {frame.displayName}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="grid grid-cols-2 gap-2">
                                            <button
                                                onClick={() => setCurrentFrameIndex(Math.max(0, currentFrameIndex - 1))}
                                                disabled={currentFrameIndex === 0}
                                                className="flex items-center justify-center px-3 py-2.5 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                Previous
                                            </button>
                                            <button
                                                onClick={() => setCurrentFrameIndex(Math.min(frames.length - 1, currentFrameIndex + 1))}
                                                disabled={currentFrameIndex === frames.length - 1}
                                                className="flex items-center justify-center px-3 py-2.5 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                Next
                                            </button>
                                        </div>
                                        <button
                                            onClick={() => setIsPlaying(!isPlaying)}
                                            className="w-full flex items-center justify-center px-4 py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-md text-sm font-medium"
                                        >
                                            {isPlaying ? 'Pause Timeline' : 'Play Timeline'}
                                        </button>
                                        <div className="space-y-2">
                                            <div className="bg-gray-200 rounded-full h-1.5">
                                                <div
                                                    className="bg-gray-900 h-1.5 rounded-full"
                                                    style={{ width: `${((currentFrameIndex + 1) / frames.length) * 100}%` }}
                                                ></div>
                                            </div>
                                            <div className="flex justify-between text-xs text-gray-500">
                                                <span>{frames[0]?.displayName}</span>
                                                <span>{frames[frames.length - 1]?.displayName}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex-grow"></div>

                                    {currentDataType === 'sss' && (
                                        <div className="space-y-3">
                                          <div className="text-xs font-medium text-gray-700 uppercase tracking-wide">Salinity Scale</div>
                                          <div className="space-y-2">
                                            <div className="h-6 bg-gradient-to-r from-blue-900 via-blue-500 via-cyan-400 via-green-400 to-red-500 rounded"></div>
                                            <div className="flex justify-between text-xs text-gray-600">
                                              <span>Low</span>
                                              <span>High</span>
                                            </div>
                                          </div>
                                        </div>
                                    )}
                                    
                                    {currentDataType === 'ssha' && (
                                        <div className="space-y-3">
                                            <div className="text-xs font-medium text-gray-700 uppercase tracking-wide">Height Change Scale</div>
                                            <img src="/assets/ssha/ssha_bar_2.png" alt="SSHA color scale" className="rounded-md" />
                                        </div>
                                    )}

                                    {currentDataType !== 'ssha' && (
                                      <div className="text-xs text-gray-500 mt-auto">
                                          {imageCache.size} / {frames.length} images cached
                                      </div>
                                    )}
                                </div>
                            ) : (
                                <div className="text-gray-500">Select a data type.</div>
                            )}
                        </div>
                    </div>

                    <div className="bg-white border-t border-gray-200 p-4">
                        <div className="flex gap-1 overflow-x-auto pb-2" style={{ scrollbarWidth: 'thin' }}>
                            {displayFrames.map((frame, index) => (
                                <button
                                    key={frame.id}
                                    onClick={() => {
                                        if (currentDataType === 'ssha') {
                                            handleFrameClick(frame.startIndex);
                                        } else {
                                            handleFrameClick(index);
                                        }
                                    }}
                                    className={`flex-shrink-0 px-3 py-2 text-xs font-medium rounded transition-all duration-200 hover:bg-gray-100 ${
                                    (currentDataType === 'ssha' && index === currentUniqueFrameIndexForSSHA) || (currentDataType !== 'ssha' && index === currentFrameIndex)
                                        ? 'bg-gray-900 text-white'
                                        : 'bg-gray-50 text-gray-600 hover:text-gray-900'
                                    }`}
                                >
                                    {frame.displayName}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OceanTimeline;