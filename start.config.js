var config = {
    "apps":[
        {
            "name"        : "frontend_" + process.env.START_PORT,
            "script"      : "./bin/www",  // 实际启动脚本
            "cwd"         : "./",  // "当前工作路径"
            "node_args"   : "--harmony", // node运行模式
            "max_memory_restart": "300M",
            "instances"   : "2",
            "exec_mode"   : "cluster",
            "watch": false,
            "error_file" : "./logs/pm2_errors.log",  // 错误日志路径
            "out_file"   : "./logs/pm2_out.log",  // 普通日志路径
            "log_date_format":"YYYY-MM-DD HH:mm Z", //日期格式
            "env": {
                "NODE_ENV": "production",
                "PORT":     process.env.START_PORT,
                "SERV_ENV": "official"
            },
            "env_dev": {
                "NODE_ENV": "development",
                "PORT"    : process.env.START_PORT,
                "SERV_ENV": "test"
            }
        }
    ]
}

module.exports = config;
