--
-- PostgreSQL database cluster dump
--

SET default_transaction_read_only = off;

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;

--
-- Roles
--

CREATE ROLE postgres;
ALTER ROLE postgres WITH SUPERUSER INHERIT CREATEROLE CREATEDB LOGIN REPLICATION BYPASSRLS;






--
-- Database creation
--

CREATE DATABASE colsys WITH TEMPLATE = template0 OWNER = postgres;
REVOKE CONNECT,TEMPORARY ON DATABASE template1 FROM PUBLIC;
GRANT CONNECT ON DATABASE template1 TO PUBLIC;


\connect colsys

SET default_transaction_read_only = off;

--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.1
-- Dumped by pg_dump version 9.6.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


--
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;


--
-- Name: EXTENSION pgcrypto; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: action; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE action (
    id integer NOT NULL,
    name character varying(20),
    callbackfn text,
    updatedat timestamp with time zone DEFAULT now(),
    isdeleted boolean DEFAULT false
);


ALTER TABLE action OWNER TO postgres;

--
-- Name: action_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE action_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE action_id_seq OWNER TO postgres;

--
-- Name: action_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE action_id_seq OWNED BY action.id;


--
-- Name: invokedrule; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE invokedrule (
    id integer NOT NULL,
    ruleid integer,
    data text,
    updatedat timestamp with time zone DEFAULT now(),
    isdeleted boolean DEFAULT false
);


ALTER TABLE invokedrule OWNER TO postgres;

--
-- Name: invokedrule_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE invokedrule_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE invokedrule_id_seq OWNER TO postgres;

--
-- Name: invokedrule_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE invokedrule_id_seq OWNED BY invokedrule.id;


--
-- Name: rule; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE rule (
    id integer NOT NULL,
    actionid integer,
    rule character varying(255) DEFAULT ''::character varying,
    name character varying(50),
    index integer,
    status boolean,
    updatedat timestamp with time zone DEFAULT now(),
    isdeleted boolean DEFAULT false
);


ALTER TABLE rule OWNER TO postgres;

--
-- Name: rule_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE rule_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE rule_id_seq OWNER TO postgres;

--
-- Name: rule_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE rule_id_seq OWNED BY rule.id;


--
-- Name: ruledetail; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE ruledetail (
    id integer NOT NULL,
    ruleid integer,
    sensorid integer,
    operator character varying(5),
    numbervalue integer,
    updatedat timestamp with time zone DEFAULT now(),
    isdeleted boolean DEFAULT false
);


ALTER TABLE ruledetail OWNER TO postgres;

--
-- Name: ruledetail_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE ruledetail_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE ruledetail_id_seq OWNER TO postgres;

--
-- Name: ruledetail_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE ruledetail_id_seq OWNED BY ruledetail.id;


--
-- Name: sensor; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE sensor (
    id integer NOT NULL,
    connection character varying(100),
    name character varying(50),
    type character varying(10),
    status boolean,
    updatedat timestamp with time zone DEFAULT now(),
    isdeleted boolean DEFAULT false
);


ALTER TABLE sensor OWNER TO postgres;

--
-- Name: sensor_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE sensor_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE sensor_id_seq OWNER TO postgres;

--
-- Name: sensor_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE sensor_id_seq OWNED BY sensor.id;


--
-- Name: sensordata; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE sensordata (
    id integer NOT NULL,
    sensorid integer,
    val integer,
    "time" integer
);


ALTER TABLE sensordata OWNER TO postgres;

--
-- Name: sensordata_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE sensordata_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE sensordata_id_seq OWNER TO postgres;

--
-- Name: sensordata_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE sensordata_id_seq OWNED BY sensordata.id;


--
-- Name: user_account; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE user_account (
    id integer NOT NULL,
    fullname character varying(100),
    email character varying(100),
    password character varying(100),
    createdat timestamp with time zone DEFAULT now(),
    updatedat timestamp with time zone DEFAULT now(),
    isdeleted boolean DEFAULT false
);


ALTER TABLE user_account OWNER TO postgres;

--
-- Name: user_account_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE user_account_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE user_account_id_seq OWNER TO postgres;

--
-- Name: user_account_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE user_account_id_seq OWNED BY user_account.id;


--
-- Name: action id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY action ALTER COLUMN id SET DEFAULT nextval('action_id_seq'::regclass);


--
-- Name: invokedrule id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY invokedrule ALTER COLUMN id SET DEFAULT nextval('invokedrule_id_seq'::regclass);


--
-- Name: rule id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY rule ALTER COLUMN id SET DEFAULT nextval('rule_id_seq'::regclass);


--
-- Name: ruledetail id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY ruledetail ALTER COLUMN id SET DEFAULT nextval('ruledetail_id_seq'::regclass);


--
-- Name: sensor id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY sensor ALTER COLUMN id SET DEFAULT nextval('sensor_id_seq'::regclass);


--
-- Name: sensordata id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY sensordata ALTER COLUMN id SET DEFAULT nextval('sensordata_id_seq'::regclass);


--
-- Name: user_account id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY user_account ALTER COLUMN id SET DEFAULT nextval('user_account_id_seq'::regclass);


--
-- Data for Name: action; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY action (id, name, callbackfn, updatedat, isdeleted) FROM stdin;
5	Updated Action	updatedcallbackfn	2017-04-21 14:56:25.113025+00	t
4	Send Email	sendEmail	2017-05-19 10:03:08.150073+00	f
1	Push Notification	pushNotif	2017-05-19 10:03:35.130225+00	f
2	Action 2	CallbackFn2	2017-05-21 16:16:36.624546+00	t
3	Action 3	CallbackFn3	2017-05-21 16:16:41.018955+00	t
\.


--
-- Name: action_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('action_id_seq', 5, true);


--
-- Data for Name: invokedrule; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY invokedrule (id, ruleid, data, updatedat, isdeleted) FROM stdin;
1	1	test	2017-05-20 16:35:24.023157+00	f
2	2	test2	2017-05-20 16:35:37.191212+00	f
3	9	{"s1":1,"s2":17,"s3":172,"s4":238}	2017-05-20 23:40:35.557562+00	f
4	9	{"s1":1,"s2":15,"s3":199,"s4":261}	2017-05-20 23:40:44.562459+00	f
5	1	{"s1":1,"s2":15,"s3":199,"s4":261}	2017-05-20 23:40:44.562438+00	f
6	9	{"s1":1,"s2":15,"s3":199,"s4":261}	2017-05-20 23:40:44.566624+00	f
7	1	{"s1":1,"s2":15,"s3":148,"s4":204}	2017-05-20 23:40:47.554244+00	f
8	9	{"s1":1,"s2":16,"s3":129,"s4":225}	2017-05-20 23:40:59.580485+00	f
9	9	{"s1":1,"s2":20,"s3":191,"s4":275}	2017-05-20 23:41:17.593369+00	f
10	9	{"s1":1,"s2":16,"s3":133,"s4":254}	2017-05-20 23:41:20.585636+00	f
11	9	{"s1":1,"s2":17,"s3":162,"s4":206}	2017-05-20 23:41:26.58913+00	f
12	1	{"s1":0,"s2":15,"s3":180,"s4":219}	2017-05-20 23:41:32.595873+00	f
13	1	{"s1":0,"s2":15,"s3":169,"s4":245}	2017-05-20 23:41:35.590942+00	f
14	9	{"s1":1,"s2":16,"s3":169,"s4":245}	2017-05-20 23:41:35.606052+00	f
15	9	{"s1":1,"s2":17,"s3":125,"s4":230}	2017-05-20 23:41:50.609299+00	f
16	9	{"s1":1,"s2":19,"s3":114,"s4":201}	2017-05-20 23:41:56.623262+00	f
17	9	{"s1":1,"s2":19,"s3":179,"s4":215}	2017-05-20 23:41:59.613517+00	f
18	9	{"s1":1,"s2":19,"s3":179,"s4":215}	2017-05-20 23:41:59.624439+00	f
19	9	{"s1":1,"s2":16,"s3":121,"s4":290}	2017-05-20 23:42:11.622959+00	f
20	9	{"s1":1,"s2":19,"s3":175,"s4":292}	2017-05-20 23:42:20.628309+00	f
21	9	{"s1":1,"s2":16,"s3":126,"s4":245}	2017-05-20 23:42:23.642441+00	f
22	9	{"s1":1,"s2":17,"s3":140,"s4":276}	2017-05-20 23:42:32.637117+00	f
23	9	{"s1":1,"s2":19,"s3":156,"s4":204}	2017-05-20 23:42:38.657373+00	f
24	9	{"s1":1,"s2":16,"s3":131,"s4":290}	2017-05-20 23:43:11.750562+00	f
25	9	{"s1":1,"s2":20,"s3":145,"s4":246}	2017-05-20 23:43:14.681413+00	f
26	9	{"s1":1,"s2":17,"s3":103,"s4":268}	2017-05-20 23:43:26.697484+00	f
27	9	{"s1":1,"s2":19,"s3":103,"s4":268}	2017-05-20 23:43:29.676077+00	f
28	9	{"s1":1,"s2":19,"s3":174,"s4":223}	2017-05-20 23:43:30.418124+00	f
29	1	{"s1":1,"s2":15,"s3":174,"s4":223}	2017-05-20 23:43:32.685482+00	f
30	9	{"s1":1,"s2":15,"s3":174,"s4":223}	2017-05-20 23:43:32.685931+00	f
31	1	{"s1":0,"s2":15,"s3":105,"s4":224}	2017-05-20 23:43:32.701857+00	f
32	9	{"s1":1,"s2":18,"s3":169,"s4":201}	2017-05-20 23:43:38.831462+00	f
33	9	{"s1":1,"s2":19,"s3":186,"s4":201}	2017-05-20 23:43:41.686918+00	f
34	1	{"s1":0,"s2":15,"s3":194,"s4":219}	2017-05-20 23:43:59.734482+00	f
35	1	{"s1":0,"s2":15,"s3":194,"s4":219}	2017-05-20 23:43:59.73628+00	f
36	9	{"s1":1,"s2":19,"s3":158,"s4":257}	2017-05-20 23:44:01.714684+00	f
37	9	{"s1":1,"s2":19,"s3":158,"s4":257}	2017-05-20 23:44:01.714712+00	f
38	9	{"s1":1,"s2":15,"s3":156,"s4":202}	2017-05-20 23:44:08.650033+00	f
39	1	{"s1":1,"s2":15,"s3":156,"s4":202}	2017-05-20 23:44:08.65071+00	f
40	1	{"s1":1,"s2":15,"s3":156,"s4":202}	2017-05-20 23:44:08.654679+00	f
41	9	{"s1":1,"s2":15,"s3":156,"s4":202}	2017-05-20 23:44:08.654931+00	f
42	1	{"s1":0,"s2":15,"s3":150,"s4":271}	2017-05-20 23:44:09.657307+00	f
43	1	{"s1":0,"s2":15,"s3":150,"s4":271}	2017-05-20 23:44:09.659256+00	f
44	1	{"s1":1,"s2":15,"s3":178,"s4":291}	2017-05-20 23:44:11.681873+00	f
45	1	{"s1":1,"s2":15,"s3":178,"s4":291}	2017-05-20 23:44:11.682547+00	f
46	9	{"s1":1,"s2":15,"s3":178,"s4":291}	2017-05-20 23:44:11.683358+00	f
47	9	{"s1":1,"s2":15,"s3":178,"s4":291}	2017-05-20 23:44:11.683478+00	f
48	9	{"s1":1,"s2":20,"s3":148,"s4":290}	2017-05-20 23:44:12.66383+00	f
49	9	{"s1":1,"s2":20,"s3":148,"s4":290}	2017-05-20 23:44:12.665996+00	f
50	9	{"s1":1,"s2":17,"s3":111,"s4":217}	2017-05-20 23:44:13.673716+00	f
51	9	{"s1":1,"s2":17,"s3":111,"s4":217}	2017-05-20 23:44:13.674694+00	f
52	1	{"s1":0,"s2":15,"s3":134,"s4":232}	2017-05-20 23:44:15.664253+00	f
53	1	{"s1":0,"s2":15,"s3":134,"s4":232}	2017-05-20 23:44:15.66501+00	f
54	9	{"s1":1,"s2":15,"s3":152,"s4":217}	2017-05-20 23:44:17.672844+00	f
55	1	{"s1":1,"s2":15,"s3":152,"s4":217}	2017-05-20 23:44:17.674866+00	f
56	1	{"s1":1,"s2":15,"s3":152,"s4":217}	2017-05-20 23:44:17.676141+00	f
57	9	{"s1":1,"s2":15,"s3":152,"s4":217}	2017-05-20 23:44:17.676308+00	f
58	9	{"s1":1,"s2":17,"s3":196,"s4":276}	2017-05-20 23:44:18.673992+00	f
59	9	{"s1":1,"s2":17,"s3":196,"s4":276}	2017-05-20 23:44:18.674307+00	f
60	9	{"s1":1,"s2":17,"s3":179,"s4":250}	2017-05-20 23:44:20.673309+00	f
61	7	{"s1":1,"s2":17,"s3":179,"s4":250}	2017-05-20 23:44:20.674593+00	f
62	9	{"s1":1,"s2":17,"s3":179,"s4":250}	2017-05-20 23:44:20.676355+00	f
63	7	{"s1":1,"s2":17,"s3":179,"s4":250}	2017-05-20 23:44:20.676762+00	f
64	9	{"s1":1,"s2":15,"s3":198,"s4":286}	2017-05-20 23:44:21.737924+00	f
65	1	{"s1":1,"s2":15,"s3":198,"s4":286}	2017-05-20 23:44:21.739058+00	f
66	9	{"s1":1,"s2":15,"s3":198,"s4":286}	2017-05-20 23:44:21.739541+00	f
67	1	{"s1":1,"s2":15,"s3":198,"s4":286}	2017-05-20 23:44:21.741218+00	f
68	1	{"s1":0,"s2":15,"s3":143,"s4":258}	2017-05-20 23:44:28.676328+00	f
69	1	{"s1":0,"s2":15,"s3":143,"s4":258}	2017-05-20 23:44:28.677251+00	f
70	9	{"s1":1,"s2":16,"s3":123,"s4":229}	2017-05-20 23:44:29.681966+00	f
71	9	{"s1":1,"s2":16,"s3":123,"s4":229}	2017-05-20 23:44:29.685717+00	f
72	9	{"s1":1,"s2":17,"s3":103,"s4":292}	2017-05-20 23:44:30.692235+00	f
73	9	{"s1":1,"s2":17,"s3":103,"s4":292}	2017-05-20 23:44:30.693822+00	f
\.


--
-- Name: invokedrule_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('invokedrule_id_seq', 73, true);


--
-- Data for Name: rule; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY rule (id, actionid, rule, name, index, status, updatedat, isdeleted) FROM stdin;
2	2		Rule 2	4	f	2017-05-15 23:48:22.739613+00	t
3	3		Rule 3	1	t	2017-05-15 23:48:26.786859+00	t
4	4		Rule 4	3	t	2017-05-15 23:48:29.242817+00	t
8	\N	[s1] >= 70	New From React	99	t	2017-05-15 23:48:44.134476+00	t
5	2	[s1] <= 25 OR [s2] >= 30	New Rule from mutation	99	t	2017-05-16 01:14:20.570497+00	t
6	1	[s4] <= 0 AND [s3] == 99	Impossible Rule	99	t	2017-05-31 14:50:23.005164+00	f
9	1	[s1] == 1	Notify me when someone is in my room	99	t	2017-05-31 14:50:38.346159+00	f
1	1	[s1] == 1 AND [s2] >= 30	Notify motion and temperature 2 is high	99	t	2017-05-31 15:28:30.250585+00	f
7	4	[s3] >= 100	Send email when sensor 3 is high	99	t	2017-05-31 15:30:01.802499+00	f
\.


--
-- Name: rule_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('rule_id_seq', 9, true);


--
-- Data for Name: ruledetail; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY ruledetail (id, ruleid, sensorid, operator, numbervalue, updatedat, isdeleted) FROM stdin;
\.


--
-- Name: ruledetail_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('ruledetail_id_seq', 18, true);


--
-- Data for Name: sensor; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY sensor (id, connection, name, type, status, updatedat, isdeleted) FROM stdin;
3	10.151.32.123	Sensor 3	DATA	t	2017-04-17 15:25:17.851546+00	f
4	10.151.32.124	Sensor 4	DATA	f	2017-04-17 15:25:17.851546+00	f
5	10.151.32.126	Sensor 6	TIME	t	2017-04-20 08:50:40.644565+00	t
6	10.151.32.128	Updated Sensor	DATA	t	2017-04-21 11:31:04.672305+00	t
2	10.151.32.122	Sensor 2	DATA	t	2017-05-31 14:34:11.337463+00	f
1	10.151.32.121	Raspberry Pi	DATA	t	2017-05-31 14:36:33.752843+00	f
\.


--
-- Name: sensor_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('sensor_id_seq', 6, true);


--
-- Data for Name: sensordata; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY sensordata (id, sensorid, val, "time") FROM stdin;
1	1	1	1495202154
2	1	1	1495274637
3	1	1	1495274705
4	1	1	1495275538
5	1	1	1495275662
6	1	0	1495275673
7	1	0	1495278589
8	2	49	1495294919
10	4	15	1495294919
9	3	13	1495294919
12	3	17	1495294922
11	4	13	1495294922
14	3	24	1495294925
13	4	16	1495294925
15	4	19	1495294928
16	3	20	1495294928
17	2	38	1495294929
18	4	18	1495294931
19	3	17	1495294931
21	3	25	1495294934
20	4	14	1495294934
23	3	20	1495294937
22	4	20	1495294937
24	2	44	1495294939
25	4	19	1495294940
26	3	21	1495294940
27	4	18	1495294943
28	3	18	1495294943
29	4	15	1495294946
30	3	16	1495294946
32	2	52	1495294949
31	4	20	1495294949
33	3	20	1495294949
34	4	15	1495294952
35	3	19	1495294952
36	4	15	1495294955
37	3	20	1495294955
38	4	17	1495294958
39	3	19	1495294958
40	2	57	1495294959
41	2	11	1495323785
42	4	214	1495323785
43	3	160	1495323785
44	1	1	1495323785
45	2	12	1495323788
46	4	262	1495323788
47	3	142	1495323788
48	1	0	1495323788
49	2	16	1495323791
50	3	131	1495323791
51	4	290	1495323791
52	1	1	1495323791
53	2	20	1495323794
54	3	145	1495323794
55	4	246	1495323794
56	1	0	1495323794
57	2	13	1495323797
58	4	229	1495323797
59	3	107	1495323797
60	1	0	1495323797
61	2	18	1495323800
62	3	178	1495323800
63	4	207	1495323800
64	1	0	1495323800
65	2	13	1495323803
66	3	190	1495323803
67	4	218	1495323803
68	1	0	1495323803
69	2	17	1495323806
70	3	103	1495323806
71	4	268	1495323806
72	1	1	1495323806
73	2	19	1495323809
74	3	174	1495323809
75	4	223	1495323809
76	1	1	1495323809
77	2	15	1495323812
78	3	105	1495323812
79	4	224	1495323812
80	1	0	1495323812
81	2	12	1495323815
82	3	178	1495323815
83	4	257	1495323815
84	1	0	1495323815
85	2	18	1495323818
86	3	169	1495323818
87	4	201	1495323818
88	1	1	1495323818
89	2	19	1495323821
90	3	186	1495323821
91	4	215	1495323821
92	1	0	1495323821
93	2	15	1495323839
94	4	219	1495323839
95	3	194	1495323839
96	1	0	1495323839
97	2	11	1495323840
98	4	285	1495323840
99	3	178	1495323840
100	1	0	1495323840
101	2	19	1495323841
102	3	158	1495323841
103	1	1	1495323841
104	4	257	1495323841
105	2	12	1495323842
106	3	149	1495323842
107	4	271	1495323842
108	1	0	1495323842
109	2	12	1495323843
110	3	115	1495323843
111	4	238	1495323843
112	1	0	1495323843
113	2	13	1495323844
114	3	143	1495323844
115	4	276	1495323844
116	1	1	1495323844
117	2	17	1495323845
119	3	148	1495323845
118	4	210	1495323845
120	1	0	1495323845
121	3	104	1495323846
122	2	11	1495323846
123	1	0	1495323846
124	4	226	1495323846
125	3	110	1495323847
127	4	268	1495323847
126	2	14	1495323847
128	1	1	1495323847
129	2	15	1495323848
130	3	156	1495323848
131	4	202	1495323848
132	1	1	1495323848
133	3	150	1495323849
134	2	15	1495323849
135	4	271	1495323849
136	1	0	1495323849
137	3	186	1495323850
138	2	19	1495323850
139	4	296	1495323850
140	1	0	1495323850
141	3	178	1495323851
142	2	15	1495323851
143	4	291	1495323851
144	1	1	1495323851
145	2	20	1495323852
146	3	148	1495323852
147	4	290	1495323852
148	1	1	1495323852
149	3	111	1495323853
150	2	17	1495323853
151	4	217	1495323853
152	1	1	1495323853
153	3	122	1495323854
154	2	13	1495323854
155	4	277	1495323854
156	1	0	1495323854
157	4	232	1495323855
158	1	0	1495323855
159	2	15	1495323855
160	3	134	1495323855
161	2	11	1495323856
162	1	1	1495323856
163	4	205	1495323856
164	3	158	1495323856
165	2	15	1495323857
166	4	217	1495323857
167	1	1	1495323857
168	3	152	1495323857
169	2	17	1495323858
170	1	1	1495323858
171	4	276	1495323858
172	3	196	1495323858
173	2	16	1495323859
174	1	0	1495323859
175	4	212	1495323859
176	3	115	1495323859
177	2	17	1495323860
178	1	1	1495323860
179	4	250	1495323860
180	3	179	1495323860
181	2	15	1495323861
182	1	1	1495323861
183	4	286	1495323861
184	3	198	1495323861
185	4	215	1495323862
186	3	115	1495323862
188	1	0	1495323862
190	2	12	1495323863
199	3	179	1495323865
205	4	259	1495323867
207	3	153	1495323867
208	2	10	1495323867
211	3	143	1495323868
212	2	15	1495323868
214	1	1	1495323869
216	2	16	1495323869
218	1	1	1495323870
220	2	17	1495323870
189	4	207	1495323863
195	4	289	1495323864
196	2	10	1495323864
197	1	0	1495323865
202	1	1	1495323866
204	2	11	1495323866
215	3	123	1495323869
193	3	161	1495323864
210	1	0	1495323868
217	4	292	1495323870
198	4	278	1495323865
203	3	140	1495323866
206	1	0	1495323867
209	4	258	1495323868
219	3	103	1495323870
187	2	19	1495323862
191	3	101	1495323863
192	1	1	1495323863
194	1	0	1495323864
200	2	18	1495323865
201	4	231	1495323866
213	4	229	1495323869
\.


--
-- Name: sensordata_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('sensordata_id_seq', 220, true);


--
-- Data for Name: user_account; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY user_account (id, fullname, email, password, createdat, updatedat, isdeleted) FROM stdin;
1	Luthfie	wvhiegt@gmail.com	5f4dcc3b5aa765d61d8327deb882cf99	2017-04-21 16:22:49.819146+00	2017-04-21 16:22:49.819146+00	f
2	Lutfi	luthfie13@mhs.if.its.ac.id	5f4dcc3b5aa765d61d8327deb882cf99	2017-04-21 16:22:49.819146+00	2017-04-21 16:22:49.819146+00	f
3	Dummy	dummy@personal.com	5f4dcc3b5aa765d61d8327deb882cf99	2017-04-21 16:22:49.819146+00	2017-04-21 16:22:49.819146+00	f
\.


--
-- Name: user_account_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('user_account_id_seq', 3, true);


--
-- Name: action action_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY action
    ADD CONSTRAINT action_pkey PRIMARY KEY (id);


--
-- Name: invokedrule invokedrule_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY invokedrule
    ADD CONSTRAINT invokedrule_pkey PRIMARY KEY (id);


--
-- Name: rule rule_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY rule
    ADD CONSTRAINT rule_pkey PRIMARY KEY (id);


--
-- Name: ruledetail ruledetail_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY ruledetail
    ADD CONSTRAINT ruledetail_pkey PRIMARY KEY (id);


--
-- Name: sensor sensor_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY sensor
    ADD CONSTRAINT sensor_pkey PRIMARY KEY (id);


--
-- Name: sensordata sensordata_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY sensordata
    ADD CONSTRAINT sensordata_pkey PRIMARY KEY (id);


--
-- Name: user_account user_account_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY user_account
    ADD CONSTRAINT user_account_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

\connect postgres

SET default_transaction_read_only = off;

--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.1
-- Dumped by pg_dump version 9.6.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: postgres; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON DATABASE postgres IS 'default administrative connection database';


--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: tasks; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE tasks (
    id integer NOT NULL,
    description text NOT NULL
);


ALTER TABLE tasks OWNER TO postgres;

--
-- Name: tasks_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE tasks_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE tasks_id_seq OWNER TO postgres;

--
-- Name: tasks_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE tasks_id_seq OWNED BY tasks.id;


--
-- Name: tasks id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY tasks ALTER COLUMN id SET DEFAULT nextval('tasks_id_seq'::regclass);


--
-- Data for Name: tasks; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY tasks (id, description) FROM stdin;
\.


--
-- Name: tasks_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('tasks_id_seq', 1, false);


--
-- Name: tasks tasks_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY tasks
    ADD CONSTRAINT tasks_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

\connect template1

SET default_transaction_read_only = off;

--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.1
-- Dumped by pg_dump version 9.6.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: template1; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON DATABASE template1 IS 'default template for new databases';


--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


--
-- PostgreSQL database dump complete
--

--
-- PostgreSQL database cluster dump complete
--

