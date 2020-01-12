/**
 * General structure of a data object that we receive.
 */
declare type configObject = {
    long?: boolean;
    'metrics-registry'?: string;
    scope?: number;
    'user-agent'?: string;
    'init-author-email'?: string;
    'init-author-name'?: string;
    'init-author-url'?: string;
    'init-license'?: string;
    'init-version'?: string;
    prefix?: string;
    'always-auth'?: boolean;
    audit?: boolean;
    'audit-level'?: string;
    'auth-type'?: string;
    'bin-links'?: boolean;
    browser?: string;
    ca?: string;
    cache?: string;
    'cache-lock-retries'?: number;
    'cache-lock-stale'?: number;
    'cache-lock-wait'?: number;
    'cache-max'?: number;
    'cache-min'?: number;
    cafile?: string;
    cert?: string;
    cidr?: string;
    color?: boolean;
    'commit-hooks'?: boolean; description?: boolean;
    dev?: boolean;
    'dry-run'?: boolean;
    editor?: string;
    'engine-strict'?: boolean;
    'fetch-retries'?: number;
    'fetch-retry-factor'?: number;
    'fetch-retry-maxtimeout'?: number;
    'fetch-retry-mintimeout'?: number;
    force?: boolean;
    'format-package-lock'?: boolean;
    git?: string;
    'git-tag-version'?: boolean;
    global?: boolean;
    'global-style'?: boolean;
    globalconfig?: string;
    globalignorefile?: string;
    group?: number;
    'ham-it-up'?: boolean;
    heading?: string;
    'https-proxy'?: any;
    'if-present'?: boolean;
    'ignore-prepublish'?: boolean;
    'ignore-scripts'?: boolean;
    'init-module'?: string;
    json?: boolean;
    key?: any;
    'legacy-bundling'?: boolean;
    link?: boolean;
    'local-address'?: undefined;
    loglevel?: string;
    'logs-max'?: number;
    maxsockets?: number;
    message?: string;
    'node-options'?: any;
    'node-version'?: string;
    noproxy?: any;
    offline?: boolean;
    'onload-script'?: any;
    only?: any;
    optional?: boolean;
    otp?: any;
    'package-lock'?: boolean;
    'package-lock-only'?: boolean;
    parseable?: boolean;
    'prefer-offline'?: boolean;
    'prefer-online'?: boolean;
    preid?: number;
    production?: boolean;
    progress?: boolean;
    proxy?: any;
    'read-only'?: boolean;
    'rebuild-bundle'?: boolean;
    registry?: string;
    rollback?: boolean;
    save?: boolean;
    'save-bundle'?: boolean;
    'save-dev'?: boolean;
    'save-exact'?: boolean;
    'save-optional'?: boolean;
    'save-prefix'?: string;
    'save-prod'?: boolean;
    'script-shell'?: any;
    'scripts-prepend-node-path'?: string;
    searchexclude?: any;
    searchlimit?: number;
    searchopts?: number;
    searchstaleness?: number;
    'send-metrics'?: boolean;
    shell?: string;
    shrinkwrap?: boolean;
    'sign-git-commit'?: boolean;
    'sign-git-tag'?: boolean;
    'sso-poll-frequency'?: number;
    'sso-type'?: string;
    'strict-ssl'?: boolean;
    tag?: string;
    'tag-version-prefix'?: string;
    timing?: boolean;
    tmp?: string;
    umask?: number;
    unicode?: boolean;
    'unsafe-perm'?: boolean;
    'update-notifier'?: boolean;
    usage?: boolean;
    user?: string;
    userconfig?: string;
    version?: boolean;
    versions?: boolean;
    viewer?: string;
    tmpuserconfig?: string;
    tmpglobalconfig?: string;
    [key: string]: any;
}

/**
 * Contains the information related to the author (alternatively user)
 */
declare type authorInformation = {
    name?: string;
    email?: string;
    url?: string;
    value?: string;
}
/**
 * Contains all the relevant folder information
 */
declare type folderInformation = {
    userconfig?: string;
    tmp?: string;
    shell?: string;
    initModule?: string;
    globalignorefile?: string;
    globalconfig?: string;
    cache?: string;
    prefix?: string;
    'metrics-registry'?: string;
    tmpuserconfig?: string;
    tmpglobalconfig?: string;
}
/**
 * Contains all the values that has been stored with the init- prefix.
 */
declare type initObject = {
    version?: string;
    descriptsion?: string;
    main?: string;
    test?: string;
    git?: string;
    author?: string;
    license?: string;
}
