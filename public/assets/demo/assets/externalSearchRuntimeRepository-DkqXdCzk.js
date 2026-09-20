const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/web-pf6UVddy.js","assets/dist-BDdlKBnh.js"])))=>i.map(i=>d[i]);
import{r as e}from"./rolldown-runtime-QTnfLwEv.js";import{c as t,i as n,l as r,n as i,r as a,s as o}from"./storage-Boa1JFv6.js";import{n as s,o as c,s as l}from"./runtimeInvoke-BNE9rN_R.js";import{n as u,t as d}from"./systemColorMode-5JRuZIbf.js";import{t as f}from"./preload-helper-BSAKphbj.js";import{r as p}from"./dist-BDdlKBnh.js";import{t as ee}from"./react-D5e7svpi.js";import{h as te,p as ne}from"./LocalizationProvider-CShk3haj.js";import{Ea as m}from"./ui-DqFK8_0Y.js";import{r as re}from"./attachmentResourceRegistry-DV-z-Z-o.js";import{n as ie}from"./folioleMarkdownParser-J8rac2u8.js";import{o as h}from"./workspaceRestoreSession-03WfJguB.js";import{i as ae,n as oe}from"./assetMarkdownUrl-BSlqUfuB.js";function se(e){return e.replace(/^\[|\]$/g,``).trim().replace(/\s+/g,` `).toLowerCase()}function ce(e,t){let n=new Map;return e.iterate({enter(e){if(e.name!==`LinkReference`)return;let r=e.node.getChild(`LinkLabel`),i=e.node.getChild(`URL`),a=e.node.getChild(`LinkTitle`);if(!r||!i)return;let o=se(t.slice(r.from,r.to));n.has(o)||n.set(o,{raw:t.slice(i.from,i.to),title:a?t.slice(a.from,a.to):``})}}),n}function le(e,t,n){let r=e.getChildren(`LinkMark`);if(!r[0]||!r[1])return null;let i=t.slice(r[0].to,r[1].from),a=e.getChild(`LinkLabel`),o=se(a?t.slice(a.from,a.to):i)||se(i),s=n.get(o);return s?{...s,alt:i}:null}function ue(e,t,n){let r=[],i=ie.parse(e),a=ce(i,e);i.iterate({enter(i){if(i.name!==`Image`)return;let o=i.node.getChild(`URL`),s=o?null:le(i.node,e,a);if(!o&&!s)return;let c=o?e.slice(o.from,o.to):s.raw,l=c.startsWith(`<`)&&c.endsWith(`>`);if(!t(l?c.slice(1,-1):c))return;let u=oe(n);r.push(o?{from:o.from,to:o.to,text:l?`<${u}>`:u}:{from:i.from,to:i.to,text:`![${s.alt}](${u}${s.title?` ${s.title}`:``})`})}});let o=e;for(let e of r.reverse())o=o.slice(0,e.from)+e.text+o.slice(e.to);return o}function de(e,t,n){return ue(e,e=>ae(e)===t,n)}function fe(e,t,n){return ue(e,e=>e===t,n)}function pe(e){let t=new Set,n=ie.parse(e),r=ce(n,e);return n.iterate({enter(n){if(n.name!==`Image`)return;let i=n.node.getChild(`URL`),a=i?e.slice(i.from,i.to):le(n.node,e,r)?.raw;if(!a)return;let o=ae(a.startsWith(`<`)&&a.endsWith(`>`)?a.slice(1,-1):a);o&&t.add(o)}}),[...t]}p(`CapacitorSQLite`,{web:()=>f(()=>import(`./web-pf6UVddy.js`).then(e=>new e.CapacitorSQLiteWeb),__vite__mapDeps([0,1])),electron:()=>window.CapacitorCustomPlatform.plugins.CapacitorSQLite});var me={nodesAnchorResolutionStatusColumn:`ALTER TABLE nodes ADD COLUMN anchor_resolution_status TEXT`,nodesAnchorSourceVersionIdColumn:`ALTER TABLE nodes ADD COLUMN anchor_source_version_id TEXT`,nodeSyncVersionsBodyTextColumn:`ALTER TABLE node_sync_versions ADD COLUMN body_text TEXT`,syncVersionParentsBackfill:`INSERT OR IGNORE INTO node_sync_version_parents (version_id, parent_version_id, ordinal)
    SELECT version_id, parent_version_id, 0 FROM node_sync_versions WHERE parent_version_id IS NOT NULL`,syncCurrentVersionBodyTextBackfill:`UPDATE node_sync_versions SET body_text = COALESCE(
    (SELECT CAST(data AS TEXT) FROM content_blob_data
      WHERE hash = (SELECT body_blob_hash FROM nodes WHERE current_version_id = node_sync_versions.version_id)),
    (SELECT content FROM nodes WHERE current_version_id = node_sync_versions.version_id)
  ) WHERE version_id IN (SELECT current_version_id FROM nodes WHERE current_version_id IS NOT NULL)`},he={addNodesAnchorResolutionStatusIfMissing:`addNodesAnchorResolutionStatusIfMissing`,addNodesAnchorSourceVersionIdIfMissing:`addNodesAnchorSourceVersionIdIfMissing`,addNodeSyncVersionsBodyTextIfMissing:`addNodeSyncVersionsBodyTextIfMissing`,backfillSyncConflictConvergence:`backfillSyncConflictConvergence`},ge={nodesAnchorResolutionStatus:{columnName:`anchor_resolution_status`,errorMessage:`Failed to add node anchor resolution status column.`,statementName:`nodesAnchorResolutionStatusColumn`,tableName:`nodes`},nodesAnchorSourceVersionId:{columnName:`anchor_source_version_id`,errorMessage:`Failed to add node anchor source version column.`,statementName:`nodesAnchorSourceVersionIdColumn`,tableName:`nodes`},nodeSyncVersionsBodyText:{columnName:`body_text`,errorMessage:`Failed to add node version body text column.`,statementName:`nodeSyncVersionsBodyTextColumn`,tableName:`node_sync_versions`},syncConflictConvergence:{bodyTextStatementName:`syncCurrentVersionBodyTextBackfill`,errorMessage:`Failed to backfill companion sync convergence state.`,parentStatementName:`syncVersionParentsBackfill`}},_e={externalDocumentsReferenceJsonColumn:`ALTER TABLE external_documents ADD COLUMN reference_json TEXT`,externalDocumentsReferenceKindColumn:`ALTER TABLE external_documents ADD COLUMN reference_kind TEXT NOT NULL DEFAULT 'local_path'`,externalFoldersSourceRefColumn:`ALTER TABLE external_search_folders ADD COLUMN source_ref TEXT`,importSourcesSourceLocationColumn:`ALTER TABLE import_sources ADD COLUMN source_location TEXT`,importSourcesSourceRefColumn:`ALTER TABLE import_sources ADD COLUMN source_ref TEXT`,importSourcesRemoteProviderColumn:`ALTER TABLE import_sources ADD COLUMN remote_provider TEXT`,importSourcesRemoteConnectionRefColumn:`ALTER TABLE import_sources ADD COLUMN remote_connection_ref TEXT`,importSourcesRemoteDocumentIdColumn:`ALTER TABLE import_sources ADD COLUMN remote_document_id TEXT`,importSourcesRemoteAnnotationsJsonColumn:`ALTER TABLE import_sources ADD COLUMN remote_annotations_json TEXT NOT NULL DEFAULT '[]'`,importSourcesRemoteImportStateJsonColumn:`ALTER TABLE import_sources ADD COLUMN remote_import_state_json TEXT NOT NULL DEFAULT '{}'`,importSourcesWatchedBindingIdColumn:`ALTER TABLE import_sources ADD COLUMN watched_binding_id TEXT`,importSourcesWatchedRelativePathColumn:`ALTER TABLE import_sources ADD COLUMN watched_relative_path TEXT`},ve={externalDocumentsReferenceJson:{columnName:`reference_json`,errorMessage:`Failed to add external document reference payload.`,statementName:`externalDocumentsReferenceJsonColumn`,tableName:`external_documents`},externalDocumentsReferenceKind:{columnName:`reference_kind`,errorMessage:`Failed to add external document reference kind.`,statementName:`externalDocumentsReferenceKindColumn`,tableName:`external_documents`},externalFoldersSourceRef:{columnName:`source_ref`,errorMessage:`Failed to add external folder source reference.`,statementName:`externalFoldersSourceRefColumn`,tableName:`external_search_folders`},importSourcesSourceLocation:{columnName:`source_location`,errorMessage:`Failed to add import source location.`,statementName:`importSourcesSourceLocationColumn`,tableName:`import_sources`},importSourcesSourceRef:{columnName:`source_ref`,errorMessage:`Failed to add import source reference.`,statementName:`importSourcesSourceRefColumn`,tableName:`import_sources`},importSourcesRemoteProvider:{columnName:`remote_provider`,errorMessage:`Failed to add import source remote provider.`,statementName:`importSourcesRemoteProviderColumn`,tableName:`import_sources`},importSourcesRemoteConnectionRef:{columnName:`remote_connection_ref`,errorMessage:`Failed to add import source remote connection.`,statementName:`importSourcesRemoteConnectionRefColumn`,tableName:`import_sources`},importSourcesRemoteDocumentId:{columnName:`remote_document_id`,errorMessage:`Failed to add import source remote document.`,statementName:`importSourcesRemoteDocumentIdColumn`,tableName:`import_sources`},importSourcesRemoteAnnotationsJson:{columnName:`remote_annotations_json`,errorMessage:`Failed to add import source remote annotations.`,statementName:`importSourcesRemoteAnnotationsJsonColumn`,tableName:`import_sources`},importSourcesRemoteImportStateJson:{columnName:`remote_import_state_json`,errorMessage:`Failed to add import source remote import state.`,statementName:`importSourcesRemoteImportStateJsonColumn`,tableName:`import_sources`},importSourcesWatchedBindingId:{columnName:`watched_binding_id`,errorMessage:`Failed to add watched binding reference.`,statementName:`importSourcesWatchedBindingIdColumn`,tableName:`import_sources`},importSourcesWatchedRelativePath:{columnName:`watched_relative_path`,errorMessage:`Failed to add watched source location.`,statementName:`importSourcesWatchedRelativePathColumn`,tableName:`import_sources`}},ye={externalFoldersNextTable:`CREATE TABLE external_search_folders_next (
    id TEXT PRIMARY KEY, folder_path TEXT NOT NULL, attachment_mode TEXT NOT NULL,
    attachment_root_path TEXT, excluded_dirs_json TEXT NOT NULL DEFAULT '[]', status TEXT NOT NULL DEFAULT 'idle',
    document_count INTEGER NOT NULL DEFAULT 0, indexed_at TEXT, last_error TEXT,
    owner_installation_id TEXT, owner_device_name TEXT, owner_platform TEXT,
    created_at TEXT NOT NULL, updated_at TEXT NOT NULL
  )`,externalFoldersCopyLegacyRows:`INSERT INTO external_search_folders_next (
    id, folder_path, attachment_mode, attachment_root_path, excluded_dirs_json, status,
    document_count, indexed_at, last_error, created_at, updated_at
  ) SELECT id, folder_path, attachment_mode, attachment_root_path, excluded_dirs_json, status,
    document_count, indexed_at, last_error, created_at, updated_at FROM external_search_folders`,externalFoldersDropLegacyTable:`DROP TABLE external_search_folders`,externalFoldersOwnerPathIndex:`CREATE UNIQUE INDEX IF NOT EXISTS idx_external_search_folders_owner_path
    ON external_search_folders (owner_installation_id, folder_path) WHERE owner_installation_id IS NOT NULL`,externalFoldersRenameNextTable:`ALTER TABLE external_search_folders_next RENAME TO external_search_folders`},be={migrateExternalFolderOwnership:`migrateExternalFolderOwnership`},xe={nodesImportSourceFingerprintColumn:`ALTER TABLE nodes ADD COLUMN import_source_fingerprint TEXT`,nodesImportContentFingerprintColumn:`ALTER TABLE nodes ADD COLUMN import_content_fingerprint TEXT`},Se={addNodesImportSourceFingerprintIfMissing:`addNodesImportSourceFingerprintIfMissing`,addNodesImportContentFingerprintIfMissing:`addNodesImportContentFingerprintIfMissing`},Ce={nodesImportSourceFingerprint:{columnName:`import_source_fingerprint`,errorMessage:`Failed to add node import source fingerprint column.`,statementName:`nodesImportSourceFingerprintColumn`,tableName:`nodes`},nodesImportContentFingerprint:{columnName:`import_content_fingerprint`,errorMessage:`Failed to add node import content fingerprint column.`,statementName:`nodesImportContentFingerprintColumn`,tableName:`nodes`}},we={nodesEnableShortTermColumn:`ALTER TABLE nodes ADD COLUMN enable_short_term INTEGER`,nodesManualChildOrderColumn:`ALTER TABLE nodes ADD COLUMN manual_child_order TEXT`,nodesSequentialReadingEnabledColumn:`ALTER TABLE nodes ADD COLUMN sequential_reading_enabled INTEGER`,nodesShelvedAtColumn:`ALTER TABLE nodes ADD COLUMN shelved_at TEXT`},Te={nodesEnableShortTerm:{columnName:`enable_short_term`,errorMessage:`Failed to add node short-term scheduling column.`,statementName:`nodesEnableShortTermColumn`,tableName:`nodes`},nodesManualChildOrder:{columnName:`manual_child_order`,errorMessage:`Failed to add node manual child order column.`,statementName:`nodesManualChildOrderColumn`,tableName:`nodes`},nodesSequentialReadingEnabled:{columnName:`sequential_reading_enabled`,errorMessage:`Failed to add node sequential reading column.`,statementName:`nodesSequentialReadingEnabledColumn`,tableName:`nodes`},nodesShelvedAt:{columnName:`shelved_at`,errorMessage:`Failed to add node shelved topic column.`,statementName:`nodesShelvedAtColumn`,tableName:`nodes`}},Ee={syncObjectStateSequence:{createNextErrorMessage:`Failed to create sync object state repair table.`,createNextStatementName:`syncObjectStateNextTable`,dropLegacyErrorMessage:`Failed to drop legacy sync object state table.`,dropLegacyStatementName:`syncObjectStateDropLegacyTable`,indexStatementNames:[`syncObjectStateSeqIndex`,`syncObjectStateTypeSeqIndex`],indexStatementsErrorMessage:`Failed to create sync object state indexes.`,indexStatementErrorMessage:`Failed to create sync object state index.`,legacyRowsErrorMessage:`Failed to load legacy sync object state rows.`,legacyRowsQueryName:`migrationLegacySyncObjectStateRows`,legacyRowsResultKey:`rows`,nextInsertErrorMessage:`Failed to copy legacy sync object state row.`,nextInsertMutationName:`migrationSyncObjectStateNextInsert`,renameNextErrorMessage:`Failed to rename sync object state repair table.`,renameNextStatementName:`syncObjectStateRenameNextTable`,rowKeys:{contentHash:`content_hash`,currentVersionId:`current_version_id`,deletedAt:`deleted_at`,lastModifiedByHostName:`last_modified_by_host_name`,objectId:`object_id`,objectType:`object_type`,syncDirty:`sync_dirty`,updatedAt:`updated_at`},stateSeqColumnName:`state_seq`,tableName:`sync_object_state`}},De={syncGroupsWorkgroupKeyColumn:`ALTER TABLE sync_groups ADD COLUMN workgroup_key TEXT`},Oe={addSyncGroupsWorkgroupKeyIfMissing:`addSyncGroupsWorkgroupKeyIfMissing`},ke={syncGroupsWorkgroupKey:{columnName:`workgroup_key`,errorMessage:`Failed to add Sync Group workgroup key column.`,statementName:`syncGroupsWorkgroupKeyColumn`,tableName:`sync_groups`}},Ae={migrateDeliveryAuthorizations:`migrateDeliveryAuthorizations`},je={migrateSourceHostOwnership:`migrateSourceHostOwnership`},g={...he,...Se,...be,...Oe,...Ae,...je,addNodesEnableShortTermIfMissing:`addNodesEnableShortTermIfMissing`,addNodesSequentialReadingEnabledIfMissing:`addNodesSequentialReadingEnabledIfMissing`,addNodesShelvedAtIfMissing:`addNodesShelvedAtIfMissing`,addNodesManualChildOrderIfMissing:`addNodesManualChildOrderIfMissing`,addNodeViewStateSourceIfMissing:`addNodeViewStateSourceIfMissing`,addImportSourcesRemoteAnnotationsJsonIfMissing:`addImportSourcesRemoteAnnotationsJsonIfMissing`,addImportSourcesRemoteConnectionRefIfMissing:`addImportSourcesRemoteConnectionRefIfMissing`,addImportSourcesRemoteDocumentIdIfMissing:`addImportSourcesRemoteDocumentIdIfMissing`,addImportSourcesRemoteProviderIfMissing:`addImportSourcesRemoteProviderIfMissing`,addImportSourcesRemoteImportStateJsonIfMissing:`addImportSourcesRemoteImportStateJsonIfMissing`,addExternalDocumentsReferenceJsonIfMissing:`addExternalDocumentsReferenceJsonIfMissing`,addExternalDocumentsReferenceKindIfMissing:`addExternalDocumentsReferenceKindIfMissing`,addSyncBaseContentHashIfMissing:`addSyncBaseContentHashIfMissing`,backfillNodeAttachmentsFromVersions:`backfillNodeAttachmentsFromVersions`,installSchema:`installSchema`,retireLegacySyncGroupState:`retireLegacySyncGroupState`,replaceSyncPushAck:`replaceSyncPushAck`,migrateHostPermanentState:`migrateHostPermanentState`,migrateAuthorHostSnapshots:`migrateAuthorHostSnapshots`,migrateSyncGroupHosts:`migrateSyncGroupHosts`,migrateOpaqueSyncRefs:`migrateOpaqueSyncRefs`,migrateSyncObjectStateSequence:`migrateSyncObjectStateSequence`};({...me,...xe,...ye,...we,...De,..._e}),{...ge,...Ee,...Ce,...Te,...ke,...ve};var Me={nodeTextAlternativeUpdateStatus:`UPDATE node_text_alternatives SET status = ?, updated_at = ? WHERE alternative_id = ? AND status = 'available'`,nodeRekeyCopy:`INSERT OR IGNORE INTO nodes (id, parent_id, kind, priority, desired_retention, enable_short_term, sequential_reading_enabled, shelved_at, manual_child_order, title, is_title_manual, hide_title_heading, content, body_blob_hash, opening_text, virtual_filter, reveal, anchor_link, anchor_resolution_status, anchor_source_version_id, image_regions, image_sources, import_source_fingerprint, import_content_fingerprint, position, current_version_id, last_modified_by_host_name, sync_dirty, created_at, updated_at, deleted_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,nodeRekeyChildren:`UPDATE nodes SET parent_id = ? WHERE parent_id = ?`,nodeRekeyReview:`UPDATE node_review SET node_id = ? WHERE node_id = ?`,nodeRekeyReading:`UPDATE node_reading SET node_id = ? WHERE node_id = ?`,nodeRekeyOpenState:`UPDATE node_open_state SET node_id = ? WHERE node_id = ?`,nodeRekeyReadingHostState:`UPDATE node_reading_host_state SET node_id = ? WHERE node_id = ?`,nodeRekeyReviewLog:`UPDATE review_log SET node_id = ? WHERE node_id = ?`,nodeRekeyVersion:`UPDATE node_sync_versions SET object_id = ?, snapshot_json = ? WHERE version_id = ?`,nodeRekeyTombstones:`UPDATE node_sync_tombstones SET node_id = ? WHERE node_id = ?`,nodeRekeyConflicts:`UPDATE node_sync_conflicts SET object_id = ? WHERE object_id = ?`,nodeRekeyAlternatives:`UPDATE node_text_alternatives SET node_id = ? WHERE node_id = ?`,nodeRekeyOrder:`UPDATE node_order SET node_id = ? WHERE node_id = ?`,nodeRekeyViewState:`UPDATE node_view_state SET node_id = ? WHERE node_id = ?`,nodeRekeyAttachments:`UPDATE node_attachments SET node_id = ? WHERE node_id = ?`,nodeRekeySyncState:`UPDATE sync_object_state SET object_id = ? WHERE object_id = ? AND object_type IN ('node', 'node_open_state', 'node_reading', 'node_review')`,nodeRekeyPushAck:`UPDATE sync_delivery_receipts SET object_id = ? WHERE object_id = ? AND object_type = 'node'`,nodeRekeyDeleteSource:`DELETE FROM nodes WHERE id = ?`};Object.freeze({capabilities:Object.freeze([`author-host-snapshots-v1`,`article-image-sources-v1`,`attachment-metadata-only-v1`,`canonical-attachment-storage-key-v1`,`device-delivery-receipts-v1`,`desktop-soft-anchor-v1`,`device-sync-groups-v1`,`group-key-routing-v1`,`lan-sync-v1`,`opaque-sync-refs-v1`,`readwise-library-source-mode-v1`,`source-host-ownership-v1`,`sync-group-device-facts-v1`,`sync-group-member-state-v1`,ne,`complete-member-data-plane`,`workgroup-aead-v1`].sort()),max_supported_version:8,min_supported_version:8,version:8}).capabilities,new Set(Object.keys({external_document:`external_documents`,node:`nodes`}));var Ne=[{name:`id`,sql:`TEXT PRIMARY KEY`},{name:`parent_id`,sql:`TEXT`},{name:`kind`,sql:`TEXT NOT NULL`},{name:`priority`,sql:`INTEGER`,legacyOptional:!0},{name:`desired_retention`,sql:`REAL`,legacyOptional:!0},{name:`enable_short_term`,sql:`INTEGER`,legacyOptional:!0},{name:`sequential_reading_enabled`,sql:`INTEGER`,legacyOptional:!0},{name:`shelved_at`,sql:`TEXT`},{name:`manual_child_order`,sql:`TEXT`,legacyOptional:!0},{name:`title`,sql:`TEXT NOT NULL`},{name:`is_title_manual`,sql:`INTEGER NOT NULL DEFAULT 0`},{name:`hide_title_heading`,sql:`INTEGER NOT NULL DEFAULT 0`},{name:`body_blob_hash`,sql:`TEXT`},{name:`opening_text`,sql:`TEXT`},{name:`virtual_filter`,sql:`TEXT`,legacyOptional:!0},{name:`reveal`,sql:`TEXT`,legacyOptional:!0},{name:`anchor_link`,sql:`TEXT`,legacyOptional:!0},{name:`anchor_resolution_status`,sql:`TEXT`},{name:`anchor_source_version_id`,sql:`TEXT`},{name:`image_regions`,sql:`TEXT`,legacyOptional:!0},{name:`image_sources`,sql:`TEXT`,legacyOptional:!0},{name:`import_source_fingerprint`,sql:`TEXT`,legacyOptional:!0},{name:`import_content_fingerprint`,sql:`TEXT`,legacyOptional:!0},{name:`content`,sql:`TEXT NOT NULL DEFAULT ''`},{name:`current_version_id`,sql:`TEXT`,legacyOptional:!0},{name:`created_at`,sql:`TEXT NOT NULL`},{name:`updated_at`,sql:`TEXT NOT NULL`},{name:`deleted_at`,sql:`TEXT`}],Pe=Ne.map(e=>e.name),Fe=new Set(Ne.filter(e=>`legacyOptional`in e&&e.legacyOptional).map(e=>e.name));Pe.filter(e=>!Fe.has(e)),[...Fe];var Ie=[_(`node`,`node`,`structure`,`workspace`,`lww`,[`nodes`,`node_order`],!0),_(`node_order`,`node`,`structure`,`workspace`,`lww`,[`node_order`],!0),_(`external_document`,`external_document`,`structure`,`workspace`,`lww`,[`external_documents`],!0),_(`external_folder`,`external_folder`,`structure`,`workspace`,`lww`,[`external_search_folders`],!0),_(`import_source`,`import_source`,`structure`,`workspace`,`lww`,[`import_sources`],!0),_(`watched_folder`,`watched_folder`,`structure`,`workspace`,`lww`,[`watched_folder_bindings`],!0),_(`attachment`,`attachment`,`resource`,`workspace`,`lww`,[`attachments`],!0),_(`pdf_page_text`,`pdf_page_text`,`content`,`workspace`,`lww`,[`pdf_page_text`],!0),_(`content_blobs`,null,`resource`,`cache`,`cache_refresh`,[`content_blobs`,`content_blob_data`],!0,`diagnostic`),_(`node_open_state`,`node_open_state`,`activity`,`workspace`,`lww`,[`node_open_state`],!0,`diagnostic`),_(`node_reading`,`node_reading`,`reading`,`workspace`,`lww`,[`node_reading`],!0),_(`node_reading.reading_position`,`node_reading`,`reading`,`host`,`host_private`,[`node_reading_host_state`],!0,`diagnostic`),_(`node_reading_host_state`,null,`reading`,`host`,`host_private`,[`node_reading_host_state`],!0,`diagnostic`),_(`node_review`,`node_review`,`review`,`workspace`,`review_merge`,[`node_review`],!0),_(`node_text_alternative`,`node_text_alternative`,`content`,`workspace`,`lww`,[`node_text_alternatives`],!0),_(`review_log`,null,`review`,`event`,`append_only_idempotent`,[`review_log`],!0),_(`setting.workspace`,`setting`,`settings`,`workspace`,`lww`,[`setting_records`],!0),_(`setting.host`,`setting`,`settings`,`host`,`host_private`,[`setting_records`],!0,`diagnostic`),_(`view_state.active_node`,`view_state`,`ui_session`,`host`,`host_private`,[`workspace_meta`],!0,`diagnostic`),_(`view_state.node`,`view_state`,`ui_session`,`host`,`host_private`,[`node_view_state`],!0,`diagnostic`),_(`node_view_state`,null,`ui_session`,`host`,`host_private`,[`node_view_state`],!0,`diagnostic`),_(`sync_delivery_receipts`,null,`diagnostic`,`device`,`device_private`,[`sync_delivery_receipts`],!1,`diagnostic`)];Le(Ie.filter(e=>e.scope===`device`)),Le(Ie.filter(e=>e.scope===`host`)),Le(Ie.filter(e=>e.pushIssue===`review_required`));function _(e,t,n,r,i,a,o,s=`review_required`){return{category:n,conflict:i,scope:r,key:e,objectType:t,pushIssue:s,storage:a,userVisible:o}}function Le(e){return[...new Set(e.map(e=>e.objectType).filter(e=>e!==null))].sort()}var Re={argModeKey:`argMode`,defaultHostName:`*`,deletedAtKey:`deleted_at`,noneArgMode:`none`,objectIdArgMode:`object_id`,objectIdDelimiter:`:`,objectIdHostNamePartIndex:3,objectIdKey:`object_id`,objectIdKeyPartIndex:4,objectIdPartLimit:5,objectIdPrefixKey:`objectIdPrefix`,objectIdRouteKey:`objectIdKey`,objectTypeKey:`object_type`,objectTypeRouteKey:`objectType`,payloadJsonKey:`payload_json`,queryNameKey:`queryName`,viewStateNodeArgMode:`view_state_node`},v={cached:`cached`,empty:`empty`,failed:`failed`,fetching:`fetching`,missing:`missing`,passthroughAvailabilityStatuses:[`fetching`,`failed`],ready:`ready`,visibleBodyStatuses:[`missing`,`empty`,`fetching`,`failed`]};Re.objectIdDelimiter,Re.objectIdPartLimit;var ze=v;({...Me}),``+ze.cached,``+ze.fetching,``+ze.failed;function y(e){return`'${e.replaceAll(`'`,`''`)}'`}function Be(e,t){return`COALESCE(${t}, ${e})`}function Ve(e){let t=v.passthroughAvailabilityStatuses.map(y).join(`, `),n=y(v.missing),r=y(v.empty),i=y(v.ready);return`CASE ${`WHEN ${e.bodyBlobHashExpression} IS NOT NULL AND TRIM(${e.bodyBlobHashExpression}) <> '' AND ${e.bodyBlobDataExpression} IS NULL THEN CASE WHEN ${e.availabilityExpression} IN (${t}) THEN ${e.availabilityExpression} ELSE ${n} END`}${e.emptyWhenBlank?` WHEN TRIM(COALESCE(${e.contentExpression}, '')) = '' THEN ${r}`:``} ELSE ${i} END`}function He(e,t,n){return`trim(substr(${e}, max(1, ${`instr(lower(${e}), ${t})`} - ${n}), ${n*2}))`}var Ue=`Untitled`,We=`Linked PDF source ready for the reader surface.`,Ge=`char(10) || char(10)`,Ke=`COALESCE(NULLIF(TRIM(n.title), ''), ${y(Ue)})`,qe=`n.content`,Je=`CAST(cbd.data AS TEXT)`,Ye=Be(qe,Je),Xe=et(),Ze=nt(Xe),Qe=Ve({availabilityExpression:`cb.availability`,bodyBlobDataExpression:Je,bodyBlobHashExpression:`n.body_blob_hash`,contentExpression:Ye,emptyWhenBlank:!0});function $e(e){return`SELECT n.id, ${Ke} AS title, n.body_blob_hash, ${tt()} AS content, ${Qe} AS content_status, (${Xe}) AS pdf_attachment_id FROM nodes n LEFT JOIN content_blobs cb ON cb.hash = n.body_blob_hash LEFT JOIN content_blob_data cbd ON cbd.hash = n.body_blob_hash `+e}function et(e=`n.id`){return`SELECT na.attachment_id FROM node_attachments na INNER JOIN attachments a ON a.id = na.attachment_id AND a.mime_type = 'application/pdf' WHERE na.node_id = ${e} AND na.role = 'reference' ORDER BY na.attachment_id ASC LIMIT 1`}function tt(){return`CASE WHEN instr(COALESCE(${Ye}, ''), ${y(We)}) > 0 AND (${Ze}) IS NOT NULL THEN '# ' || ${Ke} || ${Ge} || (${Ze}) ELSE ${Ye} END`}function nt(e){return`SELECT group_concat(page_text.text, char(10) || char(10)) FROM (SELECT TRIM(ppt.text) AS text FROM pdf_page_text ppt WHERE ppt.attachment_id = (${e}) AND TRIM(ppt.text) <> '' ORDER BY ppt.page ASC) page_text`}function rt(e,t){return`(CASE WHEN length(${e}) = 64 AND ${e} NOT GLOB '*[^a-f0-9]*'
    THEN ${e} || (CASE lower(trim(${t})) ${Object.entries(re).map(([e,t])=>`WHEN '${e}' THEN '${t}'`).join(` `)} END) END)`}var b=`WITH RECURSIVE visible_nodes(id) AS (
  SELECT id
  FROM nodes
  WHERE parent_id IS NULL
    AND deleted_at IS NULL
  UNION ALL
  SELECT child.id
  FROM nodes child
  INNER JOIN visible_nodes parent
    ON parent.id = child.parent_id
  WHERE child.deleted_at IS NULL
)`,it=`n.content`,at=`CAST(cbd.data AS TEXT)`,ot=`CASE WHEN n.body_blob_hash IS NOT NULL AND TRIM(n.body_blob_hash) <> '' THEN ${at} ELSE ${it} END`,st=Ve({availabilityExpression:`cb.availability`,bodyBlobDataExpression:at,bodyBlobHashExpression:`n.body_blob_hash`,contentExpression:ot,emptyWhenBlank:!0}),ct={defaultSearchLimit:20,excerptRadius:80,maxSearchLimit:100,requestKeys:{limit:`limit`,query:`query`},responseKeys:{query:`query`,results:`results`},resultKeys:{contentStatus:`content_status`,excerpt:`excerpt`,matchStart:`match_start`,nodeId:`node_id`,openingText:`opening_text`,title:`title`,updatedAt:`updated_at`},searchQueryName:`topicSearch`,searchResultFields:[{outputKey:`node_id`,rowKey:`id`,type:`string`},{outputKey:`title`,rowKey:`title`,type:`string`},{outputKey:`opening_text`,rowKey:`opening_text`,type:`nullableString`},{outputKey:`content_status`,rowKey:`content_status`,type:`string`},{outputKey:`updated_at`,rowKey:`updated_at`,type:`string`},{outputKey:`match_start`,rowKey:`match_start`,type:`long`},{outputKey:`excerpt`,rowKey:`excerpt`,type:`string`}]},lt={resultKey:ct.responseKeys.results,sql:`${b} SELECT n.id, COALESCE(NULLIF(TRIM(n.title), ''), 'Untitled') AS title, n.opening_text, ${st} AS content_status, n.updated_at, max(0, instr(lower(${ot}), ?) - 1) AS match_start, ${He(ot,`?`,ct.excerptRadius)} AS excerpt FROM nodes n LEFT JOIN content_blobs cb ON cb.hash = n.body_blob_hash LEFT JOIN content_blob_data cbd ON cbd.hash = n.body_blob_hash INNER JOIN visible_nodes visible ON visible.id = n.id WHERE (instr(lower(COALESCE(n.title, '')), ?) > 0 OR instr(lower(COALESCE(n.opening_text, '')), ?) > 0 OR instr(lower(${ot}), ?) > 0) ORDER BY n.updated_at DESC, n.created_at DESC, n.id ASC LIMIT ?`,columns:ct.searchResultFields.map(e=>({key:e.rowKey,source:e.rowKey,type:e.type}))};({...ct}),lt.sql,`${rt(`a.id`,`a.mime_type`)}`,`${He(`text`,`?`,80)}`,$e(`WHERE n.id = ? LIMIT 1`),`${b} `+$e(`INNER JOIN visible_nodes visible ON visible.id = n.id WHERE n.body_blob_hash IS NOT NULL OR TRIM(COALESCE(n.content, '')) <> ''`),`${et(`?`)}`,`${b}`,`${b}`;var ut=`CREATE TABLE IF NOT EXISTS nodes (
    id TEXT PRIMARY KEY,
    parent_id TEXT REFERENCES nodes(id),
    kind TEXT NOT NULL DEFAULT 'topic',
    priority INTEGER,
    desired_retention REAL,
    enable_short_term INTEGER,
    sequential_reading_enabled INTEGER,
    shelved_at TEXT,
    manual_child_order TEXT,
    title TEXT NOT NULL,
    is_title_manual INTEGER NOT NULL DEFAULT 0,
    hide_title_heading INTEGER NOT NULL DEFAULT 0,
    content TEXT NOT NULL DEFAULT '',
    body_blob_hash TEXT,
    opening_text TEXT,
    virtual_filter TEXT,
    reveal TEXT,
    anchor_link TEXT,
    anchor_resolution_status TEXT,
    anchor_source_version_id TEXT,
    image_regions TEXT,
    image_sources TEXT,
    import_source_fingerprint TEXT,
    import_content_fingerprint TEXT,
    position INTEGER,
    current_version_id TEXT,
    last_modified_by_host_name TEXT,
    sync_dirty INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    deleted_at TEXT
  ).CREATE TABLE IF NOT EXISTS node_review (
    node_id TEXT PRIMARY KEY REFERENCES nodes(id),
    due TEXT NOT NULL,
    last_review_at TEXT,
    state INTEGER NOT NULL DEFAULT 0,
    stability REAL NOT NULL DEFAULT 0,
    difficulty REAL NOT NULL DEFAULT 0,
    elapsed_days INTEGER NOT NULL DEFAULT 0,
    scheduled_days INTEGER NOT NULL DEFAULT 0,
    reps INTEGER NOT NULL DEFAULT 0,
    lapses INTEGER NOT NULL DEFAULT 0
  ).CREATE TABLE IF NOT EXISTS node_reading (
    node_id TEXT PRIMARY KEY REFERENCES nodes(id),
    interval_duration_ms INTEGER NOT NULL DEFAULT 0,
    interval_growth_factor REAL NOT NULL DEFAULT 1,
    last_handled_at TEXT NOT NULL,
    next_at TEXT NOT NULL,
    priority REAL NOT NULL DEFAULT 0,
    repetition_count INTEGER NOT NULL DEFAULT 0,
    state TEXT NOT NULL DEFAULT 'active'
  ).CREATE TABLE IF NOT EXISTS node_open_state (
    node_id TEXT PRIMARY KEY REFERENCES nodes(id) ON DELETE CASCADE,
    last_opened_at TEXT NOT NULL
  ).CREATE TABLE IF NOT EXISTS node_reading_host_state (
    node_id TEXT NOT NULL REFERENCES nodes(id),
    host_name TEXT NOT NULL,
    reading_position INTEGER NOT NULL DEFAULT 0,
    updated_at TEXT NOT NULL,
    PRIMARY KEY (node_id, host_name)
  ).CREATE TABLE IF NOT EXISTS review_log (
    id TEXT PRIMARY KEY,
    op_id TEXT NOT NULL UNIQUE,
    host_name TEXT NOT NULL,
    node_id TEXT NOT NULL REFERENCES nodes(id),
    grade INTEGER NOT NULL,
    scheduler_version TEXT NOT NULL,
    reviewed_at TEXT NOT NULL,
    due_before TEXT NOT NULL,
    stability_before REAL NOT NULL,
    difficulty_before REAL NOT NULL,
    due_after TEXT NOT NULL,
    stability_after REAL NOT NULL,
    difficulty_after REAL NOT NULL
  ).CREATE TABLE IF NOT EXISTS node_sync_versions (
    version_id TEXT PRIMARY KEY,
    object_id TEXT NOT NULL REFERENCES nodes(id) ON DELETE CASCADE,
    parent_version_id TEXT,
    host_name TEXT NOT NULL,
    created_at TEXT NOT NULL,
    content_hash TEXT NOT NULL,
    body_text TEXT,
    snapshot_json TEXT
  ).CREATE TABLE IF NOT EXISTS node_sync_version_parents (
    version_id TEXT NOT NULL REFERENCES node_sync_versions(version_id) ON DELETE CASCADE,
    parent_version_id TEXT NOT NULL,
    ordinal INTEGER NOT NULL,
    PRIMARY KEY (version_id, parent_version_id),
    UNIQUE (version_id, ordinal)
  ).CREATE TABLE IF NOT EXISTS node_sync_tombstones (
    node_id TEXT PRIMARY KEY,
    version_id TEXT NOT NULL,
    parent_version_id TEXT,
    host_name TEXT NOT NULL,
    content_hash TEXT NOT NULL,
    snapshot_json TEXT NOT NULL,
    deleted_at TEXT NOT NULL,
    created_at TEXT NOT NULL
  ).CREATE INDEX IF NOT EXISTS idx_node_sync_tombstones_created
    ON node_sync_tombstones (created_at, version_id).CREATE TABLE IF NOT EXISTS node_sync_conflicts (
    conflict_version_id TEXT PRIMARY KEY,
    object_id TEXT NOT NULL REFERENCES nodes(id) ON DELETE CASCADE,
    parent_version_id TEXT,
    host_name TEXT,
    content_hash TEXT,
    snapshot_json TEXT NOT NULL,
    detected_at TEXT NOT NULL
  ).CREATE INDEX IF NOT EXISTS idx_node_sync_conflicts_object_detected
    ON node_sync_conflicts (object_id, detected_at).CREATE TABLE IF NOT EXISTS node_text_alternatives (
    alternative_id TEXT PRIMARY KEY,
    node_id TEXT NOT NULL REFERENCES nodes(id) ON DELETE CASCADE,
    source_version_id TEXT NOT NULL,
    body_text TEXT NOT NULL,
    source_host_name TEXT NOT NULL,
    created_at TEXT NOT NULL,
    status TEXT NOT NULL,
    updated_at TEXT NOT NULL
  ).CREATE UNIQUE INDEX IF NOT EXISTS idx_node_text_alternatives_source_version
    ON node_text_alternatives (node_id, source_version_id).CREATE UNIQUE INDEX IF NOT EXISTS idx_node_text_alternatives_available_source
    ON node_text_alternatives (node_id, source_host_name) WHERE status = 'available'.CREATE TABLE IF NOT EXISTS node_order (
    node_id TEXT PRIMARY KEY REFERENCES nodes(id),
    position INTEGER NOT NULL
  ).CREATE TABLE IF NOT EXISTS workspace_meta (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL,
    updated_at TEXT NOT NULL
  ).CREATE TABLE IF NOT EXISTS node_view_state (
    node_id TEXT NOT NULL REFERENCES nodes(id),
    host_name TEXT NOT NULL,
    scroll_top INTEGER NOT NULL DEFAULT 0,
    selection_from INTEGER,
    selection_to INTEGER,
    source TEXT NOT NULL DEFAULT 'user-scroll',
    updated_at TEXT NOT NULL,
    PRIMARY KEY (node_id, host_name)
  ).CREATE TABLE IF NOT EXISTS attachments (
    id TEXT PRIMARY KEY,
    original_name TEXT,
    mime_type TEXT,
    size_bytes INTEGER,
    created_at TEXT NOT NULL
  ).CREATE TABLE IF NOT EXISTS node_attachments (
    node_id TEXT NOT NULL REFERENCES nodes(id) ON DELETE CASCADE,
    attachment_id TEXT NOT NULL REFERENCES attachments(id),
    role TEXT NOT NULL,
    PRIMARY KEY (node_id, attachment_id, role)
  ).CREATE INDEX IF NOT EXISTS idx_node_attachments_attachment_id ON node_attachments (attachment_id).CREATE INDEX IF NOT EXISTS idx_nodes_parent_id ON nodes (parent_id).CREATE INDEX IF NOT EXISTS idx_nodes_dirty_or_unversioned_updated
    ON nodes (updated_at)
    WHERE sync_dirty = 1 OR current_version_id IS NULL.CREATE INDEX IF NOT EXISTS idx_nodes_deleted_at ON nodes (deleted_at).CREATE INDEX IF NOT EXISTS idx_nodes_body_blob_hash
    ON nodes (body_blob_hash)
    WHERE body_blob_hash IS NOT NULL.CREATE INDEX IF NOT EXISTS idx_node_review_due ON node_review (due).CREATE INDEX IF NOT EXISTS idx_node_reading_state_next_at ON node_reading (state, next_at).CREATE INDEX IF NOT EXISTS idx_review_log_node_id ON review_log (node_id).CREATE INDEX IF NOT EXISTS idx_review_log_reviewed_at_op ON review_log (reviewed_at, op_id).CREATE INDEX IF NOT EXISTS idx_review_log_host_name ON review_log (host_name)`.split(`.`),dt=[`CREATE TABLE IF NOT EXISTS companion_meta (
    key TEXT PRIMARY KEY NOT NULL,
    value TEXT NOT NULL,
    updated_at TEXT NOT NULL
  )`],ft=[`CREATE TABLE IF NOT EXISTS desktop_sources (
    source_ref TEXT PRIMARY KEY,
    source_type TEXT NOT NULL CHECK (source_type IN ('external', 'watched', 'readwise')),
    config_ref TEXT NOT NULL,
    host_name TEXT NOT NULL,
    host_platform TEXT NOT NULL,
    root_path TEXT NOT NULL,
    path_flavor TEXT NOT NULL CHECK (path_flavor IN ('posix', 'windows')),
    type_settings_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    UNIQUE (source_type, config_ref)
  )`,`CREATE INDEX IF NOT EXISTS idx_desktop_sources_host
    ON desktop_sources (host_name, source_type, updated_at)`,`CREATE TABLE IF NOT EXISTS content_blobs (
    hash TEXT PRIMARY KEY,
    storage_key TEXT NOT NULL,
    kind TEXT NOT NULL,
    mime_type TEXT,
    compression TEXT NOT NULL DEFAULT 'none',
    original_size_bytes INTEGER NOT NULL,
    stored_size_bytes INTEGER NOT NULL,
    original_sha256 TEXT NOT NULL,
    stored_sha256 TEXT NOT NULL,
    availability TEXT NOT NULL DEFAULT 'missing',
    source_host_name TEXT,
    created_at TEXT NOT NULL,
    cached_at TEXT,
    last_verified_at TEXT
  )`,`CREATE INDEX IF NOT EXISTS idx_content_blobs_availability
    ON content_blobs (availability)`,`CREATE INDEX IF NOT EXISTS idx_content_blobs_kind
    ON content_blobs (kind)`,`CREATE TABLE IF NOT EXISTS content_blob_data (
    hash TEXT PRIMARY KEY,
    data BLOB NOT NULL
  )`,`CREATE TABLE IF NOT EXISTS pdf_page_text (
    attachment_id TEXT NOT NULL,
    page INTEGER NOT NULL,
    text TEXT NOT NULL,
    page_width REAL,
    page_height REAL,
    PRIMARY KEY (attachment_id, page)
  )`,`CREATE TABLE IF NOT EXISTS import_sources (
    source_fingerprint TEXT PRIMARY KEY,
    provider TEXT NOT NULL,
    source_kind TEXT NOT NULL,
    source_name TEXT NOT NULL,
    source_locator TEXT NOT NULL,
    first_imported_at TEXT NOT NULL,
    last_imported_at TEXT NOT NULL,
    last_content_fingerprint TEXT NOT NULL,
    latest_node_id TEXT,
    watched_binding_id TEXT,
    watched_relative_path TEXT,
    source_ref TEXT,
    source_location TEXT,
    remote_provider TEXT,
    remote_connection_ref TEXT,
    remote_document_id TEXT,
    remote_annotations_json TEXT NOT NULL DEFAULT '[]',
    remote_import_state_json TEXT NOT NULL DEFAULT '{}'
  )`,`CREATE UNIQUE INDEX IF NOT EXISTS idx_import_sources_readwise_remote_document
    ON import_sources (remote_connection_ref, remote_document_id)
    WHERE remote_provider = 'readwise' AND remote_connection_ref IS NOT NULL AND remote_document_id IS NOT NULL`,`CREATE UNIQUE INDEX IF NOT EXISTS idx_import_sources_readwise_remote_topic
    ON import_sources (remote_connection_ref, latest_node_id)
    WHERE remote_provider = 'readwise' AND remote_connection_ref IS NOT NULL AND latest_node_id IS NOT NULL`,`CREATE TABLE IF NOT EXISTS external_search_folders (
    id TEXT PRIMARY KEY,
    folder_path TEXT NOT NULL,
    attachment_mode TEXT NOT NULL,
    attachment_root_path TEXT,
    excluded_dirs_json TEXT NOT NULL DEFAULT '[]',
    status TEXT NOT NULL DEFAULT 'idle',
    document_count INTEGER NOT NULL DEFAULT 0,
    indexed_at TEXT,
    last_error TEXT,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    source_ref TEXT NOT NULL
  )`,`CREATE TABLE IF NOT EXISTS watched_folder_bindings (
    binding_id TEXT PRIMARY KEY,
    connection_status TEXT NOT NULL DEFAULT 'needs-folder'
      CHECK (connection_status IN ('connected', 'needs-folder')),
    action_mode TEXT NOT NULL,
    archive_path TEXT NOT NULL DEFAULT '',
    highlight_mode TEXT NOT NULL,
    highlight_path TEXT NOT NULL DEFAULT '',
    primary_path TEXT NOT NULL DEFAULT '',
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    deleted_at TEXT,
    source_ref TEXT NOT NULL
  )`,`CREATE INDEX IF NOT EXISTS idx_watched_folder_bindings_source
    ON watched_folder_bindings (source_ref, updated_at)`,`CREATE TABLE IF NOT EXISTS external_documents (
    document_id TEXT PRIMARY KEY,
    folder_id TEXT NOT NULL,
    relative_path TEXT NOT NULL,
    file_name TEXT NOT NULL,
    extension TEXT NOT NULL,
    source_size_bytes INTEGER NOT NULL,
    source_modified_at TEXT NOT NULL,
    source_modified_ms INTEGER NOT NULL,
    content_hash TEXT NOT NULL,
    title TEXT,
    opening_text TEXT,
    body_blob_hash TEXT,
    content TEXT NOT NULL,
    reference_kind TEXT NOT NULL DEFAULT 'local_path',
    reference_json TEXT,
    indexed_at TEXT NOT NULL,
    is_present INTEGER NOT NULL DEFAULT 1,
    missing_at TEXT,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  )`],pt=[`CREATE TABLE IF NOT EXISTS sync_delivery_receipts (
    peer_id TEXT NOT NULL,
    stream_name TEXT NOT NULL,
    operation_id TEXT NOT NULL,
    object_type TEXT NOT NULL,
    object_id TEXT NOT NULL,
    payload_identity TEXT NOT NULL,
    local_position TEXT,
    status TEXT NOT NULL CHECK (status IN ('pending', 'accepted', 'confirmed', 'conflict', 'rejected')),
    remote_position TEXT,
    issue_reason TEXT,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    PRIMARY KEY (peer_id, stream_name, operation_id)
  )`,`CREATE INDEX IF NOT EXISTS idx_sync_delivery_object
    ON sync_delivery_receipts (peer_id, object_type, object_id, status)`,`CREATE INDEX IF NOT EXISTS idx_sync_delivery_pending
    ON sync_delivery_receipts (peer_id, stream_name, status, local_position)`],mt=[`CREATE TABLE IF NOT EXISTS setting_records (
    key TEXT NOT NULL,
    scope TEXT NOT NULL,
    platform TEXT NOT NULL,
    form_factor TEXT NOT NULL,
    host_name TEXT NOT NULL,
    value_json TEXT NOT NULL,
    content_hash TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    deleted_at TEXT,
    PRIMARY KEY (key, scope, platform, form_factor, host_name)
  )`,`CREATE INDEX IF NOT EXISTS idx_setting_records_lookup
    ON setting_records (key, scope, platform, form_factor, updated_at)`,`CREATE INDEX IF NOT EXISTS idx_setting_records_host
    ON setting_records (host_name, updated_at)`,`CREATE TABLE IF NOT EXISTS sync_object_state (
    object_type TEXT NOT NULL,
    object_id TEXT NOT NULL,
    state_seq INTEGER NOT NULL,
    current_version_id TEXT,
    content_hash TEXT NOT NULL,
    last_modified_by_host_name TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    deleted_at TEXT,
    sync_dirty INTEGER NOT NULL DEFAULT 0,
    base_content_hash TEXT,
    PRIMARY KEY (object_type, object_id),
    UNIQUE (state_seq)
  )`,`CREATE INDEX IF NOT EXISTS idx_sync_object_state_seq
    ON sync_object_state (state_seq)`,`CREATE INDEX IF NOT EXISTS idx_sync_object_state_type_seq
    ON sync_object_state (object_type, state_seq)`,`CREATE TABLE IF NOT EXISTS sync_change_log (
    change_id TEXT PRIMARY KEY,
    object_type TEXT NOT NULL,
    object_id TEXT NOT NULL,
    change_type TEXT NOT NULL,
    host_name TEXT NOT NULL,
    base_version_id TEXT,
    result_version_id TEXT,
    content_hash TEXT NOT NULL,
    payload_json TEXT NOT NULL,
    created_at TEXT NOT NULL,
    applied_at TEXT
  )`,`CREATE INDEX IF NOT EXISTS idx_sync_change_log_object
    ON sync_change_log (object_type, object_id, created_at)`,`CREATE INDEX IF NOT EXISTS idx_sync_change_log_host_created
    ON sync_change_log (host_name, created_at)`,`CREATE INDEX IF NOT EXISTS idx_sync_change_log_created
    ON sync_change_log (created_at, change_id)`,`CREATE INDEX IF NOT EXISTS idx_sync_change_log_result_version
    ON sync_change_log (result_version_id)`,`CREATE TABLE IF NOT EXISTS sync_peer_cursors (
    peer_id TEXT NOT NULL,
    stream_name TEXT NOT NULL,
    cursor_value TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    PRIMARY KEY (peer_id, stream_name)
  )`,...pt],ht=[`CREATE TRIGGER IF NOT EXISTS trg_sync_delivery_state_insert
   AFTER INSERT ON sync_object_state WHEN NEW.sync_dirty = 1 BEGIN
     INSERT OR IGNORE INTO sync_delivery_receipts (peer_id, stream_name, operation_id, object_type,
       object_id, payload_identity, local_position, status, remote_position, issue_reason, created_at, updated_at)
     SELECT device.device_identity_key,
       CASE WHEN NEW.object_type = 'node' THEN 'node_version' ELSE 'state' END,
       CASE WHEN NEW.object_type = 'node' THEN 'node:' || COALESCE(NEW.current_version_id, NEW.object_id)
         ELSE NEW.object_type || ':' || NEW.object_id || ':' || NEW.state_seq END,
       NEW.object_type, NEW.object_id,
       CASE WHEN NEW.object_type = 'node' THEN COALESCE(NEW.current_version_id, NEW.content_hash)
         ELSE NEW.content_hash END,
       CAST(NEW.state_seq AS TEXT), 'pending', NULL, NULL, NEW.updated_at, NEW.updated_at
     FROM sync_group_devices device
     JOIN sync_group_local_state local ON local.group_id = device.group_id AND local.singleton_id = 1
     WHERE device.state = 'active' AND device.device_identity_key <> local.local_device_identity_key
       AND NOT EXISTS (SELECT 1 FROM sync_group_removal_decisions removal
         WHERE removal.group_id = device.group_id
           AND removal.target_device_identity_key = device.device_identity_key
           AND removal.superseded_at IS NULL)
       AND NEW.updated_at >= device.joined_at;
   END`,`CREATE TRIGGER IF NOT EXISTS trg_sync_delivery_state_update
   AFTER UPDATE OF state_seq, sync_dirty ON sync_object_state WHEN NEW.sync_dirty = 1 BEGIN
     INSERT OR IGNORE INTO sync_delivery_receipts (peer_id, stream_name, operation_id, object_type,
       object_id, payload_identity, local_position, status, remote_position, issue_reason, created_at, updated_at)
     SELECT device.device_identity_key,
       CASE WHEN NEW.object_type = 'node' THEN 'node_version' ELSE 'state' END,
       CASE WHEN NEW.object_type = 'node' THEN 'node:' || COALESCE(NEW.current_version_id, NEW.object_id)
         ELSE NEW.object_type || ':' || NEW.object_id || ':' || NEW.state_seq END,
       NEW.object_type, NEW.object_id,
       CASE WHEN NEW.object_type = 'node' THEN COALESCE(NEW.current_version_id, NEW.content_hash)
         ELSE NEW.content_hash END,
       CAST(NEW.state_seq AS TEXT), 'pending', NULL, NULL, NEW.updated_at, NEW.updated_at
     FROM sync_group_devices device
     JOIN sync_group_local_state local ON local.group_id = device.group_id AND local.singleton_id = 1
     WHERE device.state = 'active' AND device.device_identity_key <> local.local_device_identity_key
       AND NOT EXISTS (SELECT 1 FROM sync_group_removal_decisions removal
         WHERE removal.group_id = device.group_id
           AND removal.target_device_identity_key = device.device_identity_key
           AND removal.superseded_at IS NULL)
       AND NEW.updated_at >= device.joined_at;
   END`,`CREATE TRIGGER IF NOT EXISTS trg_sync_delivery_device_leave
   AFTER UPDATE OF state ON sync_group_devices WHEN NEW.state = 'left' BEGIN
     DELETE FROM sync_delivery_receipts WHERE peer_id = NEW.device_identity_key;
     DELETE FROM sync_peer_cursors WHERE peer_id = NEW.device_identity_key;
   END`,`CREATE TRIGGER IF NOT EXISTS trg_sync_delivery_review_insert
   AFTER INSERT ON review_log BEGIN
     INSERT OR IGNORE INTO sync_delivery_receipts (peer_id, stream_name, operation_id, object_type,
       object_id, payload_identity, local_position, status, remote_position, issue_reason, created_at, updated_at)
     SELECT device.device_identity_key, 'review_log', 'review_log:' || NEW.op_id,
       'review_log', NEW.op_id, NEW.op_id, NEW.reviewed_at, 'pending', NULL, NULL,
       NEW.reviewed_at, NEW.reviewed_at
     FROM sync_group_devices device
     JOIN sync_group_local_state local ON local.group_id = device.group_id AND local.singleton_id = 1
     WHERE device.state = 'active' AND device.device_identity_key <> local.local_device_identity_key
       AND NOT EXISTS (SELECT 1 FROM sync_group_removal_decisions removal
         WHERE removal.group_id = device.group_id
           AND removal.target_device_identity_key = device.device_identity_key
           AND removal.superseded_at IS NULL)
       AND NEW.reviewed_at >= device.joined_at;
   END`],gt=[`CREATE TABLE IF NOT EXISTS sync_groups (
    group_id TEXT PRIMARY KEY,
    display_name TEXT NOT NULL,
    workgroup_key TEXT NOT NULL,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  )`,`CREATE TABLE IF NOT EXISTS sync_group_devices (
    group_id TEXT NOT NULL REFERENCES sync_groups(group_id) ON DELETE CASCADE,
    device_identity_key TEXT NOT NULL,
    device_anchor TEXT NOT NULL,
    canonical_library_path TEXT NOT NULL,
    device_name TEXT NOT NULL,
    platform TEXT NOT NULL,
    state TEXT NOT NULL CHECK (state IN ('active', 'left')),
    joined_at TEXT NOT NULL,
    left_at TEXT,
    last_seen_at TEXT,
    updated_at TEXT NOT NULL,
    PRIMARY KEY (group_id, device_identity_key)
  )`,`CREATE INDEX IF NOT EXISTS idx_sync_group_devices_state
    ON sync_group_devices (group_id, state, updated_at)`,`CREATE TABLE IF NOT EXISTS sync_group_local_state (
    singleton_id INTEGER PRIMARY KEY CHECK (singleton_id = 1),
    group_id TEXT NOT NULL REFERENCES sync_groups(group_id) ON DELETE CASCADE,
    local_device_identity_key TEXT NOT NULL,
    state TEXT NOT NULL CHECK (state = 'active'),
    updated_at TEXT NOT NULL
  )`,`CREATE TABLE IF NOT EXISTS sync_group_nonce_ledger (
    group_id TEXT NOT NULL REFERENCES sync_groups(group_id) ON DELETE CASCADE,
    identity TEXT NOT NULL,
    expires_at INTEGER NOT NULL,
    PRIMARY KEY (group_id, identity)
  )`,`CREATE TABLE IF NOT EXISTS sync_group_removal_decisions (
    group_id TEXT NOT NULL REFERENCES sync_groups(group_id) ON DELETE CASCADE,
    decision_id TEXT NOT NULL,
    target_device_identity_key TEXT NOT NULL,
    initiated_by_device_identity_key TEXT NOT NULL,
    created_at TEXT NOT NULL,
    completed_at TEXT,
    superseded_at TEXT,
    PRIMARY KEY (group_id, decision_id)
  )`,`CREATE INDEX IF NOT EXISTS idx_sync_group_removal_target
    ON sync_group_removal_decisions (group_id, target_device_identity_key, completed_at)`,`CREATE TABLE IF NOT EXISTS sync_group_removal_confirmations (
    group_id TEXT NOT NULL,
    decision_id TEXT NOT NULL,
    confirming_device_identity_key TEXT NOT NULL,
    kind TEXT NOT NULL CHECK (kind IN ('enforced', 'target_exit')),
    confirmed_at TEXT NOT NULL,
    PRIMARY KEY (group_id, decision_id, confirming_device_identity_key),
    FOREIGN KEY (group_id, decision_id) REFERENCES sync_group_removal_decisions(group_id, decision_id)
      ON DELETE CASCADE
  )`];[...dt,...ut,...ft,...mt,...gt,...ht];var _t=[`trg_sync_delivery_state_insert`,`trg_sync_delivery_state_update`,`trg_sync_delivery_member_leave`,`trg_sync_delivery_device_leave`,`trg_sync_delivery_review_insert`],vt=[`delivery_authorization_migration_aliases`,`sync_group_host_aliases`,`sync_group_member_departures`,`sync_group_members`,`sync_group_removal_confirmations`,`sync_group_removal_decisions`,`sync_group_devices`,`sync_group_local_state`,`sync_group_nonce_ledger`,`sync_groups`,`sync_delivery_receipts`,`sync_peer_cursors`,`sync_push_ack`];[..._t.map(e=>`DROP TRIGGER IF EXISTS ${e}`),...vt.map(e=>`DROP TABLE IF EXISTS ${e}`),...pt,...gt,...ht],yt(`trg_sync_delivery_state_insert`,`AFTER INSERT ON sync_object_state`),yt(`trg_sync_delivery_state_update`,`AFTER UPDATE OF state_seq, sync_dirty ON sync_object_state`);function yt(e,t){return`CREATE TRIGGER IF NOT EXISTS ${e}
   ${t} WHEN NEW.sync_dirty = 1 BEGIN
     INSERT OR IGNORE INTO sync_delivery_receipts (
       authorization_id, stream_name, operation_id, object_type, object_id, payload_identity,
       local_position, status, remote_position, issue_reason, created_at, updated_at
     )
     SELECT member.authorization_id,
       CASE WHEN NEW.object_type = 'node' THEN 'node_version' ELSE 'state' END,
       CASE WHEN NEW.object_type = 'node' THEN 'node:' || COALESCE(NEW.current_version_id, NEW.object_id)
            ELSE NEW.object_type || ':' || NEW.object_id || ':' || NEW.state_seq END,
       NEW.object_type, NEW.object_id,
       CASE WHEN NEW.object_type = 'node' THEN COALESCE(NEW.current_version_id, NEW.content_hash)
            ELSE NEW.content_hash END,
       CAST(NEW.state_seq AS TEXT), 'pending', NULL, NULL, NEW.updated_at, NEW.updated_at
     FROM sync_group_members member
     JOIN sync_group_local_state local ON local.group_id = member.group_id AND local.singleton_id = 1
     WHERE member.state = 'active' AND member.host_name <> local.local_host_name
       AND NEW.updated_at >= member.joined_at;
   END`}g.addNodeSyncVersionsBodyTextIfMissing,g.addNodeViewStateSourceIfMissing,g.addNodesAnchorResolutionStatusIfMissing,g.addNodesAnchorSourceVersionIdIfMissing,g.addNodesEnableShortTermIfMissing,g.addNodesImportContentFingerprintIfMissing,g.addNodesImportSourceFingerprintIfMissing,g.addNodesManualChildOrderIfMissing,g.addNodesSequentialReadingEnabledIfMissing,g.addNodesShelvedAtIfMissing,g.addSyncBaseContentHashIfMissing,g.addSyncGroupsWorkgroupKeyIfMissing,g.addImportSourcesRemoteProviderIfMissing,g.addImportSourcesRemoteConnectionRefIfMissing,g.addImportSourcesRemoteDocumentIdIfMissing,g.addImportSourcesRemoteAnnotationsJsonIfMissing,g.addImportSourcesRemoteImportStateJsonIfMissing,g.addExternalDocumentsReferenceKindIfMissing,g.addExternalDocumentsReferenceJsonIfMissing;function bt(){throw Error(`iOS companion database owner is not ready.`)}var x=e(ee(),1),xt={enabled:!0,opacityPercent:100},St={enabled:o.selectionToolbarEnabled,opacityPercent:o.selectionToolbarOpacityPercent};function Ct(e){if(e==null||e===``)return xt.opacityPercent;let t=typeof e==`number`?e:Number(e);return Number.isFinite(t)?Math.max(0,Math.min(100,Math.round(t))):xt.opacityPercent}function wt(){let e=i(St.enabled);return e===null?xt.enabled:e===`true`}function Tt(e){n(St.enabled,String(e))}function Et(){return Ct(i(St.opacityPercent))}function Dt(e){let t=Ct(e);return n(St.opacityPercent,String(t)),t}function Ot(e){typeof document>`u`||document.documentElement.style.setProperty(`--app-selection-toolbar-opacity`,String(Ct(e)/100))}var S={light:{accent:`#3f8f68`,cloze:`#facc15`,font:`#202124`,highlight:`#38bdf8`,selection:`#3876ff`},dark:{accent:`#7fb18d`,cloze:`#e1c15a`,font:`#e8e6df`,highlight:`#5cc8f3`,selection:`#78a6ff`}},kt=S.light.font,At=`#2f3b4d`;function C(e){return`${Number.parseInt(e.slice(1,3),16)} ${Number.parseInt(e.slice(3,5),16)} ${Number.parseInt(e.slice(5,7),16)}`}function jt(e){return e.split(` `).map(e=>Number(e))}function Mt(e,t,n){let r=jt(e),i=jt(t);return r.map((e,t)=>Math.round(e*n+i[t]*(1-n))).join(` `)}function Nt(e,t){return Mt(e,t===`dark`?`22 25 24`:`255 255 255`,t===`dark`?.68:.72)}function Pt(e){return e===`dark`?.42:.2}function Ft(e){return e===`dark`?.28:.34}function It(e){return e===`dark`?.24:.34}var Lt=S.light.font,Rt=S.light.accent,zt=S.light.selection,Bt=S.light.highlight,Vt=S.light.cloze,Ht=S.dark.font,Ut=S.dark.accent,Wt=S.dark.selection,Gt=S.dark.highlight,Kt=S.dark.cloze,qt=new Set([`#3f8f68`,`#202124`]),w={fontColor:o.fontColor,fontColorDark:o.fontColorDark,accentColor:o.accentColor,accentColorDark:o.accentColorDark,selectionColor:o.selectionColor,selectionColorDark:o.selectionColorDark,highlightColor:o.highlightColor,highlightColorDark:o.highlightColorDark,clozeColor:o.clozeColor,clozeColorDark:o.clozeColorDark};function T(e,t,n){return n===`dark`?t:e}function E(e,t){let n=e.trim(),r=/^#([0-9a-fA-F]{6})$/.exec(n);return r?.[1]?`#${r[1].toLowerCase()}`:t}function Jt(e){return E(e,Rt)}function Yt(e){return E(e,Lt)}function Xt(e){return E(e,zt)}function Zt(e){return E(e,Bt)}function Qt(e){return E(e,Vt)}function $t(e){return e===`dark`?Ut:Rt}function en(e){return e===`dark`?Ht:Lt}function tn(e){return e===`dark`?Wt:zt}function nn(e){return e===`dark`?Gt:Bt}function rn(e){return e===`dark`?Kt:Vt}function an(e,t){return t===`dark`?`color-mix(in srgb, ${e} 50%, rgb(var(--color-canvas)) 50%)`:`rgb(var(--app-selection-color-rgb) / ${Pt(t)})`}function on(e){return e===`dark`?`#ffffff`:`rgb(var(--color-foreground))`}function sn(e=`light`){let t=i(T(w.fontColor,w.fontColorDark,e));return t?Yt(t):en(e)}function cn(e,t=`light`){n(T(w.fontColor,w.fontColorDark,t),Yt(e))}function ln(e=`light`){let t=i(T(w.accentColor,w.accentColorDark,e));return t?Jt(t):$t(e)}function un(e,t=`light`){n(T(w.accentColor,w.accentColorDark,t),Jt(e))}function dn(e=`light`){let t=i(T(w.selectionColor,w.selectionColorDark,e));return t?Xt(t):tn(e)}function fn(e,t=`light`){n(T(w.selectionColor,w.selectionColorDark,t),Xt(e))}function pn(e=`light`){let t=i(T(w.highlightColor,w.highlightColorDark,e));if(!t)return nn(e);let n=Zt(t);return qt.has(n)?nn(e):n}function mn(e,t=`light`){n(T(w.highlightColor,w.highlightColorDark,t),Zt(e))}function hn(e=`light`){let t=i(T(w.clozeColor,w.clozeColorDark,e));return t?Qt(t):rn(e)}function gn(e,t=`light`){n(T(w.clozeColor,w.clozeColorDark,t),Qt(e))}function _n(e,t){let n=Jt(t.accentColor),r=Yt(t.fontColor),i=Xt(t.selectionColor),a=Zt(t.highlightColor),o=Qt(t.clozeColor),s=C(n),c=C(r),l=C(i),u=C(a),d=C(o);e.style.setProperty(`--color-foreground`,c),e.style.setProperty(`--color-muted-foreground`,Nt(c,t.mode)),e.style.setProperty(`--app-accent-color`,n),e.style.setProperty(`--app-accent-color-rgb`,s),e.style.setProperty(`--app-selection-color`,i),e.style.setProperty(`--app-selection-color-rgb`,l),e.style.setProperty(`--app-text-selection-bg-color`,an(i,t.mode)),e.style.setProperty(`--app-text-selection-fg-color`,on(t.mode)),e.style.setProperty(`--app-selection-foreground-color`,on(t.mode)),e.style.setProperty(`--app-selection-surface-color`,`rgb(${l} / ${Pt(t.mode)})`),e.style.setProperty(`--app-highlight-color`,a),e.style.setProperty(`--app-highlight-color-rgb`,u),e.style.setProperty(`--app-highlight-surface-color`,`rgb(${u} / ${Ft(t.mode)})`),e.style.setProperty(`--app-cloze-color`,o),e.style.setProperty(`--app-cloze-color-rgb`,d),e.style.setProperty(`--app-cloze-surface-color`,`rgb(${d} / ${It(t.mode)})`)}var vn=1040;function yn(e){return Number.isFinite(e)?Math.min(vn,Math.max(680,Math.round(e))):860}function bn(){let e=i(o.readingContentWidth);return yn(e?Number(e):860)}function xn(e){let t=yn(e);n(o.readingContentWidth,String(t))}function D(e){return Math.min(255,Math.max(0,Math.round(e)))}function O(e,t){return Math.min(t,Math.max(0,e))}function k(e){return D(e).toString(16).padStart(2,`0`)}function A(e){return Number.parseInt(e,16)}function Sn(e,t,n){let r=n;return r<0&&(r+=1),r>1&&--r,r<1/6?e+(t-e)*6*r:r<1/2?t:r<2/3?e+(t-e)*(2/3-r)*6:e}function j(e){let t=e.trim().toLowerCase(),n=t.startsWith(`#`)?t.slice(1):t;return/^[0-9a-f]{6}$/.test(n)?{a:1,b:A(n.slice(4,6)),g:A(n.slice(2,4)),r:A(n.slice(0,2))}:/^[0-9a-f]{8}$/.test(n)?{a:A(n.slice(6,8))/255,b:A(n.slice(4,6)),g:A(n.slice(2,4)),r:A(n.slice(0,2))}:null}function Cn(e){return`#${k(e.r)}${k(e.g)}${k(e.b)}`}function M(e){let t=Cn(e);return e.a>=.999?t:`${t}${k(e.a*255)}`}function wn(e,t){return{...e,a:O(t,100)/100}}function N(e){let t=D(e.r)/255,n=D(e.g)/255,r=D(e.b)/255,i=Math.max(t,n,r),a=Math.min(t,n,r),o=(i+a)/2;if(i===a)return{h:0,l:Math.round(o*100),s:0};let s=i-a,c=o>.5?s/(2-i-a):s/(i+a),l=0;return l=i===t?(n-r)/s+(n<r?6:0):i===n?(r-t)/s+2:(t-n)/s+4,{h:Math.round(l/6*360)%360,l:Math.round(o*100),s:Math.round(c*100)}}function P(e){let t=(e.h%360+360)%360/360,n=O(e.s,100)/100,r=O(e.l,100)/100;if(n===0){let t=D(r*255);return{a:e.a,b:t,g:t,r:t}}let i=r<.5?r*(1+n):r+n-r*n,a=2*r-i;return{a:e.a,b:D(Sn(a,i,t-1/3)*255),g:D(Sn(a,i,t)*255),r:D(Sn(a,i,t+1/3)*255)}}function Tn(e){let t=D(e.r)/255,n=D(e.g)/255,r=D(e.b)/255,i=Math.max(t,n,r),a=i-Math.min(t,n,r),o=0;return a!==0&&(o=i===t?(n-r)/a+(n<r?6:0):i===n?(r-t)/a+2:(t-n)/a+4),{h:Math.round(o/6*360)%360,s:i===0?0:Math.round(a/i*100),v:Math.round(i*100)}}function En(e){let t=(e.h%360+360)%360,n=O(e.s,100)/100,r=O(e.v,100)/100,i=r*n,a=t/60,o=i*(1-Math.abs(a%2-1)),s=r-i,c=0,l=0,u=0;return a>=0&&a<1?(c=i,l=o):a<2?(c=o,l=i):a<3?(l=i,u=o):a<4?(l=o,u=i):a<5?(c=o,u=i):(c=i,u=o),{a:e.a,b:D((u+s)*255),g:D((l+s)*255),r:D((c+s)*255)}}function Dn(e,t){let n=j(e);return n?M(n):t}var On=94,kn=8,An=-4,jn=.45;function Mn(e){return Math.min(100,Math.max(0,Math.round(e)))}function Nn(e){let t=j(e);if(!t)return!1;let n=N(t);return n.l>=On&&n.s<=kn}function Pn(e,t){let n=j(e),r=j(t);if(!n||!r||!Nn(e))return e;let i=N(n),a=N(r);return M(P({a:n.a,h:a.h,l:Mn(i.l+An),s:Mn(a.s*jn)}))}var Fn=62,In=4;function Ln(e){return Math.min(100,Math.max(0,Math.round(e)))}function Rn(e){let t=j(e);if(!t)return e;let n=N(t),r=zn(n.l);return M(P({a:t.a,h:n.h,l:Ln(n.l+r),s:n.s}))}function zn(e){return e>=Fn?-2:In}function Bn(e,t,n,r){return Rn(t)}var Vn=[`titlebar-rail`,`titlebar-folder`,`titlebar-topic`,`titlebar-document`,`titlebar-sidebar`,`main-rail`,`main-folder`,`main-topic`,`main-document`,`main-sidebar`,`footer-rail`,`footer-folder`,`footer-topic`,`footer-document`,`footer-sidebar`],Hn=[`#b9b1a7`,`#e7e3dd`,`#f3eee8`,`#ffffff`,`#fbf9f7`],Un=[`#171b1a`,`#1a1f1e`,`#1c2221`,`#161918`,`#1a1f1e`],Wn={"titlebar-rail":0,"titlebar-folder":1,"titlebar-topic":2,"titlebar-document":3,"titlebar-sidebar":4,"main-rail":0,"main-folder":1,"main-topic":2,"main-document":3,"main-sidebar":4,"footer-rail":0,"footer-folder":1,"footer-topic":2,"footer-document":3,"footer-sidebar":4},F={assignments:o.workspaceSurfaceAssignments,assignmentsDark:o.workspaceSurfaceAssignmentsDark,paletteDark:o.workspaceSurfacePaletteDark,palette:o.workspaceSurfacePalette},Gn=[`titlebar`,`main`,`footer`],Kn=62,qn=50,Jn=-1,Yn=1,Xn=6,Zn=10;function Qn(e,t){return t<=0?0:Math.min(Math.max(Math.round(e),0),t-1)}function $n(e){return Math.min(100,Math.max(0,Math.round(e)))}function er(e){return e===`dark`?Un:Hn}function I(e){return e===`dark`?{assignments:F.assignmentsDark,palette:F.paletteDark}:{assignments:F.assignments,palette:F.palette}}function tr(e,t=`light`){let n=er(t);if(!Array.isArray(e))return[...n];let r=e.filter(e=>typeof e==`string`).map((e,t)=>Dn(e,n[t]??n[0]??`#ffffff`));return r.length>0?r:[...n]}function nr(e,t){let n=e&&typeof e==`object`?e:{};return Object.fromEntries(Vn.map(e=>{let r=Wn[e],i=n[e];return[e,Qn(typeof i==`number`&&Number.isFinite(i)?i:r,t)]}))}function rr(e){let t=i(e);if(!t)return null;try{return JSON.parse(t)}catch{return null}}function ir(e,t){n(e,JSON.stringify(t))}function ar(e,t){let n=j(e);if(!n)return e;let r=N(n);return M(P({a:n.a,h:r.h,l:$n(r.l+t),s:r.s}))}function or(e,t,n){let r=j(e);return r?ar(e,N(r).l>=Kn?t:n):e}function sr(e){let t=j(e);return t?N(t).l>=qn?`black`:`white`:`black`}function L(e=`light`){return tr(rr(I(e).palette),e)}function cr(e,t=`light`){ir(I(t).palette,tr(e,t))}function lr(e=`light`){let t=L(e);return nr(rr(I(e).assignments),t.length)}function ur(e,t,n=`light`){ir(I(n).assignments,nr(e,t??L(n).length))}function dr(e,t){let n=tr(t.palette),r=nr(t.assignments,n.length);Vn.forEach(t=>{let i=n[r[t]]??n[0]??`#ffffff`;e.style.setProperty(`--workspace-region-${t}-bg`,i),e.style.setProperty(`--workspace-region-${t}-divider-mix-target`,sr(i)),e.style.setProperty(`--workspace-region-${t}-scrollbar-thumb-color`,Bn(t,i,n,r))}),Gn.forEach(t=>{let i=n[r[`${t}-folder`]]??n[0]??`#ffffff`,a=n[r[`${t}-topic`]]??n[0]??`#ffffff`;e.style.setProperty(`--workspace-divider-${t}-folder-topic-opacity`,i===a?`0`:`1`)});let i=n[r[`main-sidebar`]]??n[0]??`#ffffff`,a=Pn(n[r[`main-document`]]??n[0]??`#ffffff`,i);e.style.setProperty(`--workspace-region-main-document-token-bg`,a),e.style.setProperty(`--workspace-region-main-document-token-divider-mix-target`,sr(a)),e.style.setProperty(`--workspace-region-main-document-scrollbar-thumb-color`,Bn(`main-document`,a,n,r)),e.style.setProperty(`--workspace-region-main-sidebar-panel-bg`,or(i,Jn,Xn)),e.style.setProperty(`--workspace-region-main-sidebar-panel-elevated-bg`,or(i,Yn,Zn))}function fr(e){if(e==null||e===``)return 100;let t=typeof e==`number`?e:Number(e);return Number.isFinite(t)?Math.max(0,Math.min(100,Math.round(t))):100}function pr(){return fr(i(o.workspaceDividerOpacityPercent))}function mr(e){let t=fr(e);return n(o.workspaceDividerOpacityPercent,String(t)),t}function hr(e,t){e.style.setProperty(`--workspace-divider-opacity`,String(fr(t)/100))}var gr=[`default`,`system`,`serif`,`custom`],_r=[`default`,`jetbrains`,`cascadia`,`consolas`,`fira`,`sarasa`,`custom`],vr=[`original`,`inverted`,`warm`],yr=1.3,br=.05,xr=1.5,Sr=.05,Cr=`warm`,R=1.75,wr=.75,z={interfaceFont:o.interfaceFont,monospaceFont:o.monospaceFont,interfaceFontSize:o.interfaceFontSize,customInterfaceFont:o.customInterfaceFont,customMonospaceFont:o.customMonospaceFont};function Tr(e){return h(e,gr)!==null}function Er(e){return h(e,_r)!==null}function Dr(e){return Math.max(12,Math.min(36,Math.round(e)))}function B(e){return(e.replace(/[;{}]/g,``).replace(/^@/,``).replace(/\s*\([^)]*\)\s*$/g,``).trim().split(/\s+&\s+/)[0]?.trim()??``).slice(0,256)}function Or(){let e=i(z.interfaceFont);return e&&Tr(e)?e:`default`}function kr(e){n(z.interfaceFont,e)}function Ar(){let e=i(z.customInterfaceFont);return e?B(e):``}function jr(e){n(z.customInterfaceFont,B(e))}function Mr(){let e=i(z.customMonospaceFont);return e?B(e):``}function Nr(e){n(z.customMonospaceFont,B(e))}function Pr(){let e=i(z.monospaceFont);return e&&Er(e)?e:`default`}function Fr(e){n(z.monospaceFont,e)}function Ir(){let e=i(z.interfaceFontSize);if(e===null)return 17;let t=Number(e);return Number.isFinite(t)?Dr(t):17}function Lr(e){n(z.interfaceFontSize,String(Dr(e)))}var Rr=[`light`,`dark`,`system`];function zr(e){return h(e,Rr)!==null}function Br(e){return e===`system`?d()||(typeof window>`u`||typeof window.matchMedia!=`function`?`light`:window.matchMedia(`(prefers-color-scheme: dark)`).matches?`dark`:`light`):e}var V={baseColor:o.baseColor,dimImagesInDarkMode:o.dimImagesInDarkMode,immersiveDoubleClickEditEnabled:o.immersiveDoubleClickEditEnabled,pdfReadingMode:o.pdfReadingMode};function Vr(e){return h(e,vr)!==null}function Hr(){let e=i(V.baseColor);return e&&zr(e)?e:t}function Ur(e){n(V.baseColor,e)}function Wr(){let e=i(V.pdfReadingMode);return e&&Vr(e)?e:Cr}function Gr(e){n(V.pdfReadingMode,e)}function Kr(){let e=i(V.immersiveDoubleClickEditEnabled);return e===null||e===`true`}function qr(e){n(V.immersiveDoubleClickEditEnabled,String(e))}function Jr(e,t){return t===`dark`?e:`original`}function Yr(){let e=i(V.dimImagesInDarkMode);return e===null||e===`true`}function Xr(e){n(V.dimImagesInDarkMode,String(e))}var H=`var(--font-family-text)`,Zr={default:H,system:H,serif:`'Source Serif 4', 'Noto Serif CJK SC', 'Songti SC', SimSun, Georgia, serif`,custom:H},Qr={default:`'JetBrains Mono', 'Cascadia Code', 'Sarasa Mono SC', 'SFMono-Regular', Menlo, Consolas, 'Noto Sans Mono CJK SC', monospace`,jetbrains:`'JetBrains Mono', 'Cascadia Code', Consolas, monospace`,cascadia:`'Cascadia Code', Consolas, 'JetBrains Mono', monospace`,consolas:`Consolas, 'Cascadia Code', 'SFMono-Regular', Menlo, monospace`,fira:`'Fira Code', 'JetBrains Mono', 'Cascadia Code', monospace`,sarasa:`'Sarasa Mono SC', 'JetBrains Mono', 'Cascadia Code', monospace`,custom:`'JetBrains Mono', 'Cascadia Code', 'Sarasa Mono SC', 'SFMono-Regular', Menlo, Consolas, 'Noto Sans Mono CJK SC', monospace`},$r=.9,ei=.92,ti=15,ni=22;function ri(e){return`'${e.replace(/'/g,`\\'`)}'`}function U(e){return`${Math.round(e*100)/100}px`}function ii(e,t){return e===`custom`?t?`${ri(t)}, ${H}`:H:Zr[e]}function ai(){return`var(--font-family-interface)`}function oi(e,t){return e===`custom`?t?`${ri(t)}, ${Qr.default}`:Qr.default:Qr[e]}function si(e,t){e.style.setProperty(`--content-panel-font-size`,`${t}px`),e.style.setProperty(`--content-panel-h1-font-size`,U(t*1.42)),e.style.setProperty(`--content-panel-h2-font-size`,U(t*1.18)),e.style.setProperty(`--content-panel-h3-font-size`,U(t*1.04)),e.style.setProperty(`--content-panel-code-font-size`,U(t*$r)),e.style.setProperty(`--app-shellless-input-font-size`,U(Math.min(ni,Math.max(ti,t*ei))))}function ci(e){let t=typeof e==`number`?e:Number(e);return Number.isFinite(t)?Number((Math.round(Math.min(Math.max(t,yr),2)/br)*br).toFixed(2)):R}function li(e){let t=typeof e==`number`?e:Number(e);return Number.isFinite(t)?Number((Math.round(Math.min(Math.max(t,0),xr)/Sr)*Sr).toFixed(2)):wr}function ui(e,t){e.style.setProperty(`--content-panel-line-height`,String(ci(t)))}function di(e,t){e.style.setProperty(`--content-panel-paragraph-spacing`,`${li(t)}em`)}var fi={dark:{"--color-app-shell":`17 20 19`,"--color-bg-panel":`26 31 30`,"--color-canvas":`22 25 24`,"--workspace-divider-mix-target":`white`,"--workspace-divider-subtle-surface-weight":`93%`},light:{"--color-app-shell":`245 245 243`,"--color-bg-panel":`246 246 246`,"--color-canvas":`255 255 255`,"--workspace-divider-mix-target":`black`,"--workspace-divider-subtle-surface-weight":`92%`}};function pi(e,t){Object.entries(fi[t]).forEach(([t,n])=>{e.style.setProperty(t,n)})}function mi(e){if(typeof document>`u`)return;let t=document.documentElement,n=Dr(e.interfaceFontSize);t.dataset.baseColor=e.baseColor,t.dataset.dimImagesInDarkMode=e.dimImagesInDarkMode?`true`:`false`,t.dataset.resolvedBaseColor=e.resolvedBaseColor,t.dataset.pdfReadingMode=Jr(e.pdfReadingMode,e.resolvedBaseColor),pi(t,e.resolvedBaseColor),_n(t,{accentColor:e.accentColor,clozeColor:e.clozeColor,fontColor:e.fontColor,highlightColor:e.highlightColor,mode:e.resolvedBaseColor,selectionColor:e.selectionColor}),dr(t,{assignments:e.workspaceSurfaceAssignments,palette:e.workspaceSurfacePalette}),hr(t,e.workspaceDividerOpacityPercent),t.style.setProperty(`--app-interface-font-family`,ai()),t.style.setProperty(`--content-panel-font-family`,ii(e.interfaceFont,B(e.customInterfaceFont))),t.style.setProperty(`--content-panel-mono-font-family`,oi(e.monospaceFont,B(e.customMonospaceFont))),t.style.setProperty(`--document-max-width`,`${e.readingContentWidth}px`),si(t,n),ui(t,e.readingLineHeight),di(t,e.readingParagraphSpacing)}var hi=o.readingLineHeight;function gi(e){if(e===`compact`)return 1.4;if(e===`standard`)return R;if(e===`relaxed`)return 1.85;if(e===null)return R;let t=Number(e);return Number.isFinite(t)&&t>=1.3&&t<=2?ci(t):R}function _i(){return gi(i(hi))}function vi(e){let t=ci(e);return n(hi,String(t)),t}var yi=o.readingParagraphSpacing;function bi(e){if(e===null)return wr;let t=Number(e);return Number.isFinite(t)&&t>=0&&t<=1.5?li(t):wr}function xi(){return bi(i(yi))}function Si(e){let t=li(e);return n(yi,String(t)),t}var Ci=o.editorDisplayMode,wi=r.editorDisplayMode;function Ti(e){return e===`preview`||e===`source`}function Ei(){let e=i(Ci);return!e||!Ti(e)?wi:e}function Di(e){n(Ci,e)}var Oi=o.frontmatterDisplayMode,ki=r.frontmatterDisplayMode;function Ai(e){return e===`compact`||e===`full`}function ji(){let e=i(Oi);return!e||!Ai(e)?ki:e}function Mi(e){n(Oi,e)}var Ni=o.frontmatterMetaFields,Pi=r.frontmatterMetaFields;function Fi(e){return e.split(`,`).map(e=>e.split(`|`).map(e=>e.trim()).filter(Boolean)).filter(e=>e.length>0)}function Ii(){return i(Ni)??Pi}function Li(e){return n(Ni,e),e}function Ri(){return Li(Pi)}var zi=o.markdownSyntaxVisibility,Bi=r.markdownSyntaxVisibility;function Vi(){return Bi}function Hi(e){n(zi,Bi)}var Ui=o.autoLocalizeRemoteImages,Wi=!0;function Gi(){let e=i(Ui);return e===null?`unset`:e===`false`?`disabled`:`enabled`}function Ki(){let e=Gi();return e===`unset`?Wi:e===`enabled`}function qi(e){n(Ui,e?`true`:`false`)}function Ji(){let[e,t]=(0,x.useState)(()=>Ki()),[n,r]=(0,x.useState)(()=>ji()),[i,a]=(0,x.useState)(()=>Ii()),[o,s]=(0,x.useState)(()=>Vi()),[c,l]=(0,x.useState)(()=>Ei()),[u,d]=(0,x.useState)(()=>wt()),[f,p]=(0,x.useState)(()=>Et());return{autoLocalizeRemoteImagesState:e,editorDisplayModeState:c,frontmatterDisplayModeState:n,frontmatterMetaFieldsState:i,markdownSyntaxVisibilityState:o,selectionToolbarEnabledState:u,selectionToolbarOpacityPercentState:f,setAutoLocalizeRemoteImagesState:t,setEditorDisplayModeState:l,setFrontmatterDisplayModeState:r,setFrontmatterMetaFieldsState:a,setMarkdownSyntaxVisibilityState:s,setSelectionToolbarEnabledState:d,setSelectionToolbarOpacityPercentState:p}}function Yi(){let e=Hr();return{baseColorMode:e,resolvedBaseColorMode:Br(e)}}function Xi(){let[e,t]=(0,x.useState)(()=>Kr()),[n,r]=(0,x.useState)(()=>bn()),[i,a]=(0,x.useState)(()=>_i()),[o,s]=(0,x.useState)(()=>xi());return{immersiveDoubleClickEditEnabledState:e,readingContentWidthState:n,readingLineHeightState:i,readingParagraphSpacingState:o,setImmersiveDoubleClickEditEnabledState:t,setReadingContentWidthState:r,setReadingLineHeightState:a,setReadingParagraphSpacingState:s}}var Zi=(0,x.createContext)(null);function Qi(){let e=(0,x.useContext)(Zi);if(!e)throw Error(`AppearanceSettingsProvider is missing.`);return e}function $i(){return(0,x.useContext)(Zi)}function ea(e){let t=t=>{Ur(t),e.setBaseColorModeState(t),e.setResolvedBaseColorModeState(Br(t))};return{resetInterfaceFontSize:()=>(Lr(17),e.setInterfaceFontSizeState(17)),resetFrontmatterMetaFields:()=>e.setFrontmatterMetaFieldsState(Ri()),setAutoLocalizeRemoteImages:t=>(qi(t),e.setAutoLocalizeRemoteImagesState(t)),setBaseColorMode:t,setCustomInterfaceFont:t=>(jr(t),e.setCustomInterfaceFontState(t)),setCustomMonospaceFont:t=>(Nr(t),e.setCustomMonospaceFontState(t)),setDimImagesInDarkMode:t=>(Xr(t),e.setDimImagesInDarkModeState(t)),setFrontmatterDisplayMode:t=>(Mi(t),e.setFrontmatterDisplayModeState(t)),setFrontmatterMetaFields:t=>e.setFrontmatterMetaFieldsState(Li(t)),setInterfaceFontPreset:t=>(kr(t),e.setInterfaceFontPresetState(t)),setInterfaceFontSize:t=>(Lr(t),e.setInterfaceFontSizeState(t)),setImmersiveDoubleClickEditEnabled:t=>(qr(t),e.setImmersiveDoubleClickEditEnabledState(t)),setMarkdownSyntaxVisibility:t=>(Hi(t),e.setMarkdownSyntaxVisibilityState(t)),setSelectionToolbarEnabled:t=>(Tt(t),e.setSelectionToolbarEnabledState(t)),setSelectionToolbarOpacityPercent:t=>e.setSelectionToolbarOpacityPercentState(Dt(t)),setMonospaceFontPreset:t=>(Fr(t),e.setMonospaceFontPresetState(t)),setPdfReadingMode:t=>(Gr(t),e.setPdfReadingModeState(t)),setReadingContentWidth:t=>(xn(t),e.setReadingContentWidthState(t)),setReadingLineHeight:t=>e.setReadingLineHeightState(vi(t)),setReadingParagraphSpacing:t=>e.setReadingParagraphSpacingState(Si(t)),toggleBaseColorMode:()=>{t(e.advanceBaseColorModeCycle(e.resolvedBaseColorModeState))},toggleEditorDisplayMode:()=>{let t=e.editorDisplayModeState===`preview`?`source`:`preview`;return e.setEditorDisplayModeState(t),Di(t)}}}function ta(e,t){return Object.fromEntries(Object.entries(e.workspaceSurfaceAssignmentsState).map(([e,n])=>[e,Math.min(Math.max(Math.round(n),0),Math.max(t.length-1,0))]))}function na(e){let t=e.resolvedBaseColorModeState===`dark`?Un:Hn;return{resetWorkspaceSurfaceSettings:()=>{cr(t,e.resolvedBaseColorModeState),ur(Wn,t.length,e.resolvedBaseColorModeState),e.setWorkspaceSurfacePaletteState(t),e.setWorkspaceSurfaceAssignmentsState(Wn)},setWorkspaceSurfaceAssignments:t=>{ur(t,e.workspaceSurfacePaletteState.length,e.resolvedBaseColorModeState),e.setWorkspaceSurfaceAssignmentsState(t)},setWorkspaceDividerOpacityPercent:t=>{e.setWorkspaceDividerOpacityPercentState(mr(t))},setWorkspaceSurfacePalette:t=>{let n=ta(e,t);cr(t,e.resolvedBaseColorModeState),ur(n,t.length,e.resolvedBaseColorModeState),e.setWorkspaceSurfacePaletteState(t),e.setWorkspaceSurfaceAssignmentsState(n)}}}function ra(e){return e===`dark`?Ut:Rt}function ia(e){return e===`dark`?Kt:Vt}function aa(e){return e===`dark`?Ht:Lt}function oa(e){return e===`dark`?Gt:Bt}function sa(e){return e===`dark`?Wt:zt}function ca(e){return{resetAccentColorPreset:()=>{let t=ra(e.resolvedBaseColorModeState);un(t,e.resolvedBaseColorModeState),e.setAccentColorPresetState(t)},resetClozeColorPreset:()=>{let t=ia(e.resolvedBaseColorModeState);gn(t,e.resolvedBaseColorModeState),e.setClozeColorPresetState(t)},resetFontColorPreset:()=>{let t=aa(e.resolvedBaseColorModeState);cn(t,e.resolvedBaseColorModeState),e.setFontColorPresetState(t)},resetHighlightColorPreset:()=>{let t=oa(e.resolvedBaseColorModeState);mn(t,e.resolvedBaseColorModeState),e.setHighlightColorPresetState(t)},resetSelectionColorPreset:()=>{let t=sa(e.resolvedBaseColorModeState);fn(t,e.resolvedBaseColorModeState),e.setSelectionColorPresetState(t)},setAccentColorPreset:t=>(un(t,e.resolvedBaseColorModeState),e.setAccentColorPresetState(t)),setClozeColorPreset:t=>(gn(t,e.resolvedBaseColorModeState),e.setClozeColorPresetState(t)),setFontColorPreset:t=>(cn(t,e.resolvedBaseColorModeState),e.setFontColorPresetState(t)),setHighlightColorPreset:t=>(mn(t,e.resolvedBaseColorModeState),e.setHighlightColorPresetState(t)),setSelectionColorPreset:t=>(fn(t,e.resolvedBaseColorModeState),e.setSelectionColorPresetState(t))}}function la(e){return{...ca(e),...ea(e),...na(e)}}function ua(e){return{selectionToolbarEnabled:e.selectionToolbarEnabledState,selectionToolbarOpacityPercent:e.selectionToolbarOpacityPercentState}}function da(e){return{immersiveDoubleClickEditEnabled:e.immersiveDoubleClickEditEnabledState,readingContentWidth:e.readingContentWidthState,readingLineHeight:e.readingLineHeightState,readingParagraphSpacing:e.readingParagraphSpacingState}}function fa(e){return{workspaceDividerOpacityPercent:e.workspaceDividerOpacityPercentState,workspaceSurfaceAssignments:e.workspaceSurfaceAssignmentsState,workspaceSurfacePalette:e.workspaceSurfacePaletteState}}function pa(e){return{nodeListRowSpacing:e.nodeListRowSpacingState,resetNodeListRowSpacing:e.resetNodeListRowSpacing,setNodeListRowSpacing:e.setNodeListRowSpacing}}function ma(e){return{accentColorPreset:e.accentColorPresetState,autoLocalizeRemoteImages:e.autoLocalizeRemoteImagesState,baseColorMode:e.baseColorModeState,dimImagesInDarkMode:e.dimImagesInDarkModeState,resolvedBaseColorMode:e.resolvedBaseColorModeState,clozeColorPreset:e.clozeColorPresetState,customInterfaceFont:e.customInterfaceFontState,customMonospaceFont:e.customMonospaceFontState,editorAppearanceKey:`${e.markdownSyntaxVisibilityState}-${e.frontmatterMetaFieldsState}-${e.editorDisplayModeState}`,editorDisplayMode:e.editorDisplayModeState,fontColorPreset:e.fontColorPresetState,frontmatterDisplayMode:e.frontmatterDisplayModeState,frontmatterMetaFields:e.frontmatterMetaFieldsState,highlightColorPreset:e.highlightColorPresetState,selectionColorPreset:e.selectionColorPresetState,...ua(e),interfaceFontPreset:e.interfaceFontPresetState,interfaceFontSize:e.interfaceFontSizeState,isBaseColorModeSelectionActive:e.isBaseColorModeSelectionActiveState,markdownSyntaxVisibility:e.markdownSyntaxVisibilityState,monospaceFontPreset:e.monospaceFontPresetState,...pa(e),pdfReadingMode:e.pdfReadingModeState,...da(e),...fa(e),...la(e)}}function ha(e){return(0,x.useMemo)(()=>ma(e),[e.accentColorPresetState,e.autoLocalizeRemoteImagesState,e.baseColorModeState,e.dimImagesInDarkModeState,e.clozeColorPresetState,e.customInterfaceFontState,e.customMonospaceFontState,e.editorDisplayModeState,e.fontColorPresetState,e.frontmatterDisplayModeState,e.frontmatterMetaFieldsState,e.highlightColorPresetState,e.selectionColorPresetState,e.selectionToolbarEnabledState,e.selectionToolbarOpacityPercentState,e.resolvedBaseColorModeState,e.interfaceFontPresetState,e.interfaceFontSizeState,e.immersiveDoubleClickEditEnabledState,e.isBaseColorModeSelectionActiveState,e.markdownSyntaxVisibilityState,e.monospaceFontPresetState,e.nodeListRowSpacingState,e.pdfReadingModeState,e.readingContentWidthState,e.readingLineHeightState,e.readingParagraphSpacingState,e.workspaceDividerOpacityPercentState,e.workspaceSurfaceAssignmentsState,e.workspaceSurfacePaletteState])}var ga=2e3;function _a(e){return e===`light`?[`dark`,`system`,`light`]:[`light`,`system`,`dark`]}function va(){let[e,t]=(0,x.useState)(!1),n=(0,x.useRef)(null),r=(0,x.useRef)(null);return(0,x.useEffect)(()=>()=>{r.current&&clearTimeout(r.current)},[]),{advanceBaseColorModeCycle:(0,x.useCallback)(e=>{let i=n.current??{index:-1,sequence:_a(e)},a=(i.index+1)%i.sequence.length;return n.current={...i,index:a},t(!0),r.current&&clearTimeout(r.current),r.current=setTimeout(()=>{n.current=null,t(!1)},ga),i.sequence[a]},[]),isBaseColorModeSelectionActiveState:e}}function ya(){return 14}function ba(){return 12}function xa(e){return Math.max(20,Math.ceil(e*1.4))}function Sa(e){return Math.max(18,Math.ceil(e*1.4))}var Ca=0,wa=24;function Ta(e){if(e===null||e.trim()===``)return 6;let t=Number(e);return Number.isFinite(t)?Math.max(Ca,Math.min(wa,Math.round(t))):6}function Ea(){return Ta(i(o.nodeListRowSpacing))}function Da(e){let t=Ta(String(e));if(t===6){a(o.nodeListRowSpacing);return}n(o.nodeListRowSpacing,String(t))}function Oa(e){return Math.max(1,e-2)}function ka(e,t=0,n=14){return xa(n)+e*2+t}function Aa(e,t,n,r=0){return ka(e,r,t)+Sa(n)}function ja(){let[e,t]=(0,x.useState)(Ea);return{nodeListRowSpacingState:e,resetNodeListRowSpacing:()=>(Da(6),t(6)),setNodeListRowSpacing:e=>(Da(e),t(Ea()))}}var Ma=te(),Na=typeof window>`u`?x.useEffect:x.useLayoutEffect;function Pa(e){let[t,n]=(0,x.useState)(()=>ln(e)),[r,i]=(0,x.useState)(()=>sn(e)),[a,o]=(0,x.useState)(()=>dn(e)),[s,c]=(0,x.useState)(()=>pn(e)),[l,u]=(0,x.useState)(()=>hn(e)),[d,f]=(0,x.useState)(()=>L(e)),[p,ee]=(0,x.useState)(()=>lr(e));return{accentColorPresetState:t,clozeColorPresetState:l,fontColorPresetState:r,highlightColorPresetState:s,selectionColorPresetState:a,setAccentColorPresetState:n,setClozeColorPresetState:u,setFontColorPresetState:i,setHighlightColorPresetState:c,setSelectionColorPresetState:o,setWorkspaceSurfaceAssignmentsState:ee,setWorkspaceSurfacePaletteState:f,workspaceSurfaceAssignmentsState:p,workspaceSurfacePaletteState:d}}function Fa(){let e=Yi(),t=Ji(),n=Xi(),r=ja(),i=Pa(e.resolvedBaseColorMode),a=va(),[o,s]=(0,x.useState)(()=>e.baseColorMode),[c,l]=(0,x.useState)(()=>Yr()),[u,d]=(0,x.useState)(()=>e.resolvedBaseColorMode),[f,p]=(0,x.useState)(()=>Wr()),[ee,te]=(0,x.useState)(()=>Or()),[ne,m]=(0,x.useState)(()=>Ar()),[re,ie]=(0,x.useState)(()=>Pr()),[h,ae]=(0,x.useState)(()=>Mr()),[oe,se]=(0,x.useState)(()=>Ir()),[ce,le]=(0,x.useState)(()=>pr());return{...i,...t,...n,...r,...a,baseColorModeState:o,dimImagesInDarkModeState:c,customInterfaceFontState:ne,customMonospaceFontState:h,interfaceFontPresetState:ee,interfaceFontSizeState:oe,monospaceFontPresetState:re,pdfReadingModeState:f,resolvedBaseColorModeState:u,setBaseColorModeState:s,setDimImagesInDarkModeState:l,setCustomInterfaceFontState:m,setCustomMonospaceFontState:ae,setInterfaceFontPresetState:te,setInterfaceFontSizeState:se,setMonospaceFontPresetState:ie,setPdfReadingModeState:p,setResolvedBaseColorModeState:d,setWorkspaceDividerOpacityPercentState:le,workspaceDividerOpacityPercentState:ce}}function Ia(e,t){e.setAccentColorPresetState(t.accentColorPreset),e.setSelectionColorPresetState(t.selectionColorPreset),e.setFontColorPresetState(t.fontColorPreset),e.setHighlightColorPresetState(t.highlightColorPreset),e.setClozeColorPresetState(t.clozeColorPreset),e.setWorkspaceSurfacePaletteState(t.workspaceSurfacePalette),e.setWorkspaceSurfaceAssignmentsState(t.workspaceSurfaceAssignments)}function La(e){return{accentColorPreset:ln(e),clozeColorPreset:hn(e),fontColorPreset:sn(e),highlightColorPreset:pn(e),selectionColorPreset:dn(e),workspaceSurfaceAssignments:lr(e),workspaceSurfacePalette:L(e)}}function Ra(e){(0,x.useEffect)(()=>{let t=()=>{e.setResolvedBaseColorModeState(Br(e.baseColorModeState))};if(t(),e.baseColorModeState!==`system`)return;let n=u(t);if(n)return n;if(typeof window>`u`||typeof window.matchMedia!=`function`)return;let r=window.matchMedia(`(prefers-color-scheme: dark)`);return r.addEventListener(`change`,t),()=>r.removeEventListener(`change`,t)},[e.baseColorModeState,e.setResolvedBaseColorModeState])}function za(e){Na(()=>{Ia(e,La(e.resolvedBaseColorModeState))},[e.resolvedBaseColorModeState])}function Ba(e){Na(()=>{let t=La(e.resolvedBaseColorModeState);mi({accentColor:t.accentColorPreset,baseColor:e.baseColorModeState,resolvedBaseColor:e.resolvedBaseColorModeState,dimImagesInDarkMode:e.dimImagesInDarkModeState,pdfReadingMode:e.pdfReadingModeState,readingContentWidth:e.readingContentWidthState,readingLineHeight:e.readingLineHeightState,readingParagraphSpacing:e.readingParagraphSpacingState,clozeColor:t.clozeColorPreset,customInterfaceFont:e.customInterfaceFontState,customMonospaceFont:e.customMonospaceFontState,fontColor:t.fontColorPreset,highlightColor:t.highlightColorPreset,selectionColor:t.selectionColorPreset,interfaceFont:e.interfaceFontPresetState,interfaceFontSize:e.interfaceFontSizeState,monospaceFont:e.monospaceFontPresetState,workspaceDividerOpacityPercent:e.workspaceDividerOpacityPercentState,workspaceSurfaceAssignments:t.workspaceSurfaceAssignments,workspaceSurfacePalette:t.workspaceSurfacePalette}),Ot(e.selectionToolbarOpacityPercentState)},[e.accentColorPresetState,e.baseColorModeState,e.clozeColorPresetState,e.customInterfaceFontState,e.customMonospaceFontState,e.dimImagesInDarkModeState,e.fontColorPresetState,e.highlightColorPresetState,e.interfaceFontPresetState,e.interfaceFontSizeState,e.monospaceFontPresetState,e.pdfReadingModeState,e.readingContentWidthState,e.readingLineHeightState,e.readingParagraphSpacingState,e.selectionColorPresetState,e.selectionToolbarOpacityPercentState,e.resolvedBaseColorModeState,e.workspaceDividerOpacityPercentState,e.workspaceSurfaceAssignmentsState,e.workspaceSurfacePaletteState])}function Va(e){Ra(e),za(e),Ba(e)}function Ha(){let e=Fa();return Va(e),ha(e)}function Ua({children:e}){let t=Ha();return(0,Ma.jsx)(Zi.Provider,{value:t,children:e})}var Wa=[`up`,`down`,`left`,`right`];function W(e){return e.join(`-`)}function G(e,t=8){return e.reduce((e,n)=>(e.length<t&&e.at(-1)!==n&&e.push(n),e),[])}var K=Wa.flatMap(e=>[{directions:[e],gesture:e,isCustom:!1},...Wa.filter(t=>t!==e).map(t=>({directions:[e,t],gesture:`${e}-${t}`,isCustom:!1}))]);K.map(e=>e.gesture);function Ga(e,t=[]){let n=W(G(e));return n&&[...K,...t].some(e=>e.gesture===n)?n:null}function Ka(e,t){return t?e.find(e=>e.gesture===t)?.commandId??null:null}function qa(e,t){let n=G(e);if(!n.length)return`empty`;let r=W(n);return[...K,...t].some(e=>e.gesture===r)?`conflict`:`valid`}var Ja={left:m.goBack,right:m.goForward,"left-up":m.scrollDocumentTop,"left-down":m.scrollDocumentBottom},q=K.map(e=>({...e,commandId:Ja[e.gesture]??null})),Ya={left:o.mouseGestureLeftAction,right:o.mouseGestureRightAction,"left-up":o.mouseGestureLeftUpAction,"left-down":o.mouseGestureLeftDownAction};function Xa(e,t){return t===`disabled`?null:t===`scroll-top`?m.scrollDocumentTop:t===`scroll-bottom`?m.scrollDocumentBottom:Ja[e]??null}function Za(){let e=q.map(e=>{let t=Ya[e.gesture];return t?{...e,commandId:Xa(e.gesture,i(t))}:e});return J(e),e}function Qa(e){return e===`left`||e===`right`||e===`up`||e===`down`}function $a(e){try{let t=JSON.parse(e);if(!Array.isArray(t))return null;let n=[],r=new Map;for(let e of t){if(!e||typeof e!=`object`)continue;let t=e;if(!Array.isArray(t.directions)||!t.directions.every(Qa))continue;let i=G(t.directions),a=W(i),o=typeof t.commandId==`string`?t.commandId:null;t.isCustom===!0&&qa(i,n)===`valid`?n.push({commandId:o,directions:i,gesture:a,isCustom:!0}):K.some(e=>e.gesture===a)&&r.set(a,o)}return[...q.map(e=>({...e,commandId:r.has(e.gesture)?r.get(e.gesture)??null:e.commandId})),...n]}catch{return null}}function eo(){let e=i(o.mouseGestureBindings);return e===null?Za():$a(e)??q}function J(e){n(o.mouseGestureBindings,JSON.stringify(e))}function to(e,t){J(eo().map(n=>n.gesture===e?{...n,commandId:t}:n))}function no(e,t){let n=eo();if(qa(e,n)!==`valid`)return!1;let r=G(e);return J([...n,{commandId:t,directions:r,gesture:W(r),isCustom:!0}]),!0}function ro(){J(q)}function io(e){return e.length!==q.length||e.some(e=>{let t=q.find(t=>t.gesture===e.gesture);return!t||t.commandId!==e.commandId})}var ao={bindings:q,enabled:!0,hintVisible:!1,segmentThresholdPx:18,trailColor:At,trailLineWidth:3,trailOpacity:.25,trailPointThresholdPx:6,trailVisible:!0};function oo(e,t){return e===`true`||e!==`false`&&t}function so(e,t){let n=/^#([0-9a-fA-F]{6})$/.exec(e?.trim()??``);return n?.[1]?`#${n[1].toLowerCase()}`:t}function Y(e,t,n,r){let i=e===null||e.trim()===``?NaN:Number(e);return Number.isFinite(i)?Math.max(n,Math.min(r,Math.round(i*100)/100)):t}function co(){return{bindings:eo(),enabled:oo(i(o.mouseGesturesEnabled),!0),hintVisible:oo(i(o.mouseGestureHintVisible),!1),segmentThresholdPx:Y(i(o.mouseGestureSegmentThreshold),18,8,48),trailColor:so(i(o.mouseGestureTrailColor),At),trailLineWidth:Y(i(o.mouseGestureTrailLineWidth),3,1,12),trailOpacity:Y(i(o.mouseGestureTrailOpacity),.25,.05,1),trailPointThresholdPx:Y(i(o.mouseGestureTrailPointThreshold),6,2,24),trailVisible:oo(i(o.mouseGestureTrailVisible),!0)}}function lo(e,t){n(e===`enabled`?o.mouseGesturesEnabled:e===`hintVisible`?o.mouseGestureHintVisible:o.mouseGestureTrailVisible,String(t))}function uo(e,t,r,i,a){n(e,String(Y(String(t),r,i,a)))}function fo(e){n(o.mouseGestureTrailColor,so(e,At))}function po(e){uo(o.mouseGestureTrailLineWidth,e,3,1,12)}function mo(e){uo(o.mouseGestureTrailOpacity,e,.25,.05,1)}function ho(e){uo(o.mouseGestureSegmentThreshold,e,18,8,48)}function go(e){uo(o.mouseGestureTrailPointThreshold,e,6,2,24)}var _o=(0,x.createContext)(null);function vo(){let e=(0,x.useContext)(_o);if(!e)throw Error(`MouseGestureSettingsProvider is missing.`);return e}function yo(){let[e,t]=(0,x.useState)(()=>co()),n=()=>{t(co())};return(0,x.useMemo)(()=>({bindings:e.bindings,settings:e,addCustomGesture:(e,t)=>{let r=no(e,t);return r&&n(),r},resetBindings:()=>{ro(),n()},setBinding:(e,t)=>{to(e,t),n()},setEnabled:e=>{lo(`enabled`,e),n()},setHintVisible:e=>{lo(`hintVisible`,e),n()},setSegmentThreshold:e=>{ho(e),n()},setTrailColor:e=>{fo(e),n()},setTrailLineWidth:e=>{po(e),n()},setTrailOpacity:e=>{mo(e),n()},setTrailPointThreshold:e=>{go(e),n()},setTrailVisible:e=>{lo(`trailVisible`,e),n()}}),[e])}function bo({children:e}){let t=yo();return(0,Ma.jsx)(_o.Provider,{value:t,children:e})}var X,Z=null;function xo(e){return X===void 0?Z||(Z=e().then(e=>(X=e,e)).finally(()=>{Z=null}),Z):Promise.resolve(X)}function So(e){X=e}function Co(){return X??null}function wo(e,t,n){return Math.abs(e)>=Math.abs(t)?Math.abs(e)<n?null:e<0?`left`:`right`:Math.abs(t)<n?null:t<0?`up`:`down`}function To(e,t,n,r){let i=wo(t-e.lastPoint.x,n-e.lastPoint.y,r);return i?(e.lastPoint={x:t,y:n},e.directions.at(-1)!==i&&e.directions.length<8&&e.directions.push(i),!0):!1}function Eo(e,t,n,r,i){if(!e||!r.trailVisible)return;let a=e.getBoundingClientRect(),o={x:t-a.left,y:n-a.top};i(e=>{let t=e?.points.at(-1),n=!t||Math.hypot(o.x-t.x,o.y-t.y)>=r.trailPointThresholdPx?[...e?.points??[],o]:e?.points??[o];return{color:r.trailColor,height:a.height,lineWidth:r.trailLineWidth,opacity:r.trailOpacity,points:n,width:a.width}})}function Do(e){return e.reference??(`absolute_path`in e?{absolute_path:e.absolute_path,kind:`local_path`}:{document_id:e.document_id,kind:`mirror_document`})}function Oo(e){let t=Do(e);return{absolutePath:`absolute_path`in e?e.absolute_path:`${t.kind===`readwise_remote`?`readwise-document`:`mirror-document`}:${e.document_id}`,editable:e.editable,extension:e.extension,fileName:e.file_name,fileSize:e.file_size??null,folderId:e.folder_id,folderPath:e.folder_path,importedNodeId:e.imported_node_id??null,isPresent:e.is_present,lastOpenedAt:e.last_opened_at??null,...`document_id`in e?{documentId:e.document_id}:{},reference:t.kind===`local_path`?{absolutePath:t.absolute_path,kind:`local_path`}:t.kind===`readwise_remote`?{documentId:t.document_id,kind:`readwise_remote`,readerUrl:t.reader_url,sourceUrl:t.source_url}:{documentId:t.document_id,kind:`mirror_document`},relativePath:e.relative_path,sourceKind:e.source_kind}}function Q(e){return{accessMode:e.access_mode??`local`,attachmentMode:e.attachment_mode,attachmentRootPath:e.attachment_root_path,createdAt:e.created_at,documentCount:e.document_count,excludedDirs:e.excluded_dirs,folderPath:e.folder_path,id:e.id,indexedAt:e.indexed_at,lastError:e.last_error,mirrorEnabled:e.mirror_enabled!==!1,sourceExecutable:e.source_executable===!0,...e.source_host_name===void 0?{}:{sourceHostName:e.source_host_name},...e.source_host_platform===void 0?{}:{sourceHostPlatform:e.source_host_platform},...e.source_ref===void 0?{}:{sourceRef:e.source_ref},status:e.status,updatedAt:e.updated_at}}function ko(e){return{...Oo(e),content:e.content,modifiedAt:e.modified_at??null}}function Ao(e){return{...Oo(e),modifiedAt:e.modified_at,openingText:e.opening_text,title:e.title}}var jo=new Set;function Mo(e){return jo.add(e),()=>{jo.delete(e)}}function $(e){jo.forEach(t=>t(e))}async function No(){let e=s();if(!e)return null;let t=await e(c.loadExternalSearchFolders);return Array.isArray(t)?t.map(e=>Q(e)):[]}async function Po(){let e=s();return e?await e(c.loadActiveSyncGroupDevice)===!0:!1}async function Fo(){let e=await No();return e&&$(e),e}async function Io(e){let t=s();if(!t)return null;let n=await t(c.saveExternalSearchFolders,{folders:e.map(e=>({attachment_mode:`document_relative_first_then_fixed_root`,attachment_root_path:e.attachmentRootPath,excluded_dirs:e.excludedDirs,folder_path:e.folderPath,id:e.id}))}),r=Array.isArray(n)?n.map(e=>Q(e)):[];return $(r),r}async function Lo(e){let t=s();if(!t)return null;let n=await t(c.disconnectExternalSearchFolder,{folder_id:e}),r=Array.isArray(n)?n.map(Q):[];return $(r),r}function Ro(e,t){let n=s();return n?n(c.previewExternalSearchFolderReconnect,{folder_id:e,folder_path:t}):null}async function zo(e,t){let n=s();if(!n)return null;let r=await n(c.reconnectExternalSearchFolder,{folder_id:e,folder_path:t}),i=Array.isArray(r)?r.map(Q):[];return $(i),i}async function Bo(e){let t=s();if(!t)return null;let n=await t(c.rebuildExternalSearchIndex,e?{folder_id:e}:void 0),r=Array.isArray(n)?n.map(e=>Q(e)):[];return $(r),r}async function Vo(e){let t=s();if(!t)return null;let n=await t(c.loadExternalSearchBrowseEntries,{folder_id:e});return Array.isArray(n)?n.map(e=>Ao(e)):[]}async function Ho(e,t={}){let n=s();if(!n)return null;let r=Wo(e),i=await n(c.loadExternalSearchPreview,{...r?{document_id:r}:typeof e==`string`||e.kind===`local_path`?{absolute_path:typeof e==`string`?e:e.absolutePath}:{document_id:e.documentId},...t.folderId?{folder_id:t.folderId}:{},...t.sourceKind?{source_kind:t.sourceKind}:{}});return i?ko(i):null}async function Uo(e){let t=s();if(!t)return null;let n=Wo(e),r=n?{document_id:n}:typeof e==`string`||e.kind===`local_path`?{absolute_path:typeof e==`string`?e:e.absolutePath}:{document_id:e.documentId};return t(c.importExternalSearchDocument,r)}function Wo(e){if(typeof e!=`string`)return e.kind===`local_path`?null:e.documentId;let t=e.startsWith(`mirror-document:`)?`mirror-document:`:e.startsWith(`readwise-document:`)?`readwise-document:`:null;return t?e.slice(t.length):null}function Go(e){return l()?.onExternalDocumentFileOpened?.(e)??(()=>void 0)}export{j as $,ka as A,Ii as B,G as C,Ua as D,W as E,Qi as F,yr as G,Ei as H,$i as I,Sr as J,br as K,Ki as L,ba as M,ya as N,Ea as O,Zi as P,Cn as Q,Vi as R,io as S,de as St,Ka as T,R as U,Fi as V,wr as W,L as X,lr as Y,M as Z,Co as _,kt as _t,No as a,Tn as at,vo as b,pe as bt,Bo as c,Vt as ct,Io as d,Ht as dt,Dn as et,Go as f,Gt as ft,xo as g,zt as gt,Eo as h,Bt as ht,Vo as i,N as it,Aa as j,Oa as k,zo as l,Ut as lt,To as m,Lt as mt,Uo as n,P as nt,Ho as o,vn as ot,Mo as p,Wt as pt,xr as q,Po as r,En as rt,Ro as s,Rt as st,Lo as t,wn as tt,Fo as u,Kt as ut,So as v,bt as vt,Ga as w,ao as x,fe as xt,bo as y,b as yt,Pi as z};